import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\HomeDashboardWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_return_start = """  return (
    <WebLayout maxWidth="full">"""

new_return_start = """  if (isLoading) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Sparkles className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-bold">Loading your insights...</p>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout maxWidth="full">"""

if old_return_start in content:
    content = content.replace(old_return_start, new_return_start)
    print("Loading state added")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
