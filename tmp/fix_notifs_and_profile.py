import os

path_app = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"
path_notif = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\NotificationsScreenWeb.tsx"

# 1. Update app.py Profile Endpoint Column Trigger
with open(path_app, 'r', encoding='utf-8') as f:
    app_content = f.read()

old_sql = """        cursor.execute(\"\"\"
            UPDATE users
            SET name=%s,email=%s,profile_photo=%s
            WHERE user_id=%s
        \"\"\", (name, email, profile_photo, user_id))"""

new_sql = """        cursor.execute(\"\"\"
            UPDATE users
            SET username=%s,email=%s,profile_photo=%s
            WHERE user_id=%s
        \"\"\", (name, email, profile_photo, user_id))"""

if old_sql in app_content:
    app_content = app_content.replace(old_sql, new_sql)
    print("app.py column updated")

with open(path_app, 'w', encoding='utf-8') as f:
    f.write(app_content)


# 2. Add imports & states to NotificationsScreenWeb
with open(path_notif, 'r', encoding='utf-8') as f:
    notif_content = f.read()

old_notif_imports = """import { useState } from 'react';"""

new_notif_imports = """import { useState, useEffect } from 'react';
import { apiRequest } from '../../api/config';"""

if old_notif_imports in notif_content:
    notif_content = notif_content.replace(old_notif_imports, new_notif_imports)
    print("Notifications imports updated")

old_notif_state_full = """  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'insight',
      category: 'general',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'New Daily Insight Available',
      message: 'Your AI has generated today\\'s prediction based on recent activity patterns. 87% confidence in career growth trajectory.',
      time: '5 minutes ago',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionable: true,
      actionText: 'View Insight',
      actionRoute: '/analytics',
      priority: 'high'
    },
"""

# Harder to match whole array, let's find end of the array which ends with `]);` on line 184
# We can find line 34 containing `useState<Notification[]>([` and substitute array initialization.

# Better: create split script to solve accurately trigger mapping.
# split up content and replace fully.

with open(path_notif, 'w', encoding='utf-8') as f:
    f.write(notif_content)

# Use safer replacements logic
with open(path_notif, 'r', encoding='utf-8') as f:
    lines = f.readlines()

output_lines = []
skip_array = False

for i in range(len(lines)):
    if "const [notifications, setNotifications] = useState<Notification[]>([" in lines[i]:
        output_lines.append("  const [notifications, setNotifications] = useState<Notification[]>([]);\n")
        output_lines.append("  const [isLoading, setIsLoading] = useState(true);\n")
        output_lines.append("\n")
        output_lines.append("""  useEffect(() => {
    const fetchNotifications = async () => {
       const userStr = localStorage.getItem('user');
       if (!userStr) return;
       const user = JSON.parse(userStr);
       try {
           setIsLoading(true);
           const res = await apiRequest<any[]>(`/predictions/${user.user_id}`, 'GET');
           const mapped = (res || []).map((p: any, i: number) => {
                const isCareer = p.category?.toLowerCase() === 'career';
                return {
                    id: p.prediction_id,
                    type: 'insight',
                    category: p.category?.toLowerCase() || 'general',
                    icon: Sparkles,
                    color: isCareer ? 'text-blue-600' : 'text-green-600',
                    bgColor: isCareer ? 'bg-blue-100' : 'bg-green-100',
                    title: `Simulation: ${p.decision_input || 'New Prediction'}`,
                    message: `Growth Rating: ${p.success_probability}%. Timeline: ${p.timeline || 'Immediate'}. AI Analysis shows optimal paths.`,
                    time: new Date(p.created_at).toLocaleDateString(),
                    timestamp: new Date(p.created_at),
                    read: false,
                    actionable: true,
                    actionText: 'View Details',
                    actionRoute: '/analytics',
                    priority: 'medium'
                };
           });
           setNotifications(mapped);
       } catch (e) {
       } finally { 
           setIsLoading(false); 
       }
    };
    fetchNotifications();
  }, []);\n""")
        skip_array = True
    elif skip_array and "]);" in lines[i]:
        skip_array = False
        continue
    
    if not skip_array:
        output_lines.append(lines[i])

with open(path_notif, 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print("Replacement done for Notifs list")
