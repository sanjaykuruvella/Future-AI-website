import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\NotificationsScreenWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_return_notif = """  return (
    <WebLayout maxWidth="full">"""

new_return_notif = """  if (isLoading) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout maxWidth="full">"""

if old_return_notif in content:
    content = content.replace(old_return_notif, new_return_notif)
    print("Loading check inserted")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
