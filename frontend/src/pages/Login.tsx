<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Make-It-All Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-image: url('file:///C:/Users/alial/Downloads/928b1ec99d44118218905d485d984482886a1ae5.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center bg-black bg-opacity-60">
  <div class="bg-white w-[350px] h-[250px] rounded-xl shadow-lg p-6 flex flex-col justify-between">
    <div>
      <h2 class="text-xl font-semibold text-blue-700 text-center">🔧 Make-It-All 🔧</h2>
      <p class="text-sm text-gray-600 text-center mt-1">Sign in</p>
    </div>
    <div class="space-y-3">
      <input
        type="email"
        placeholder="jargon@make-it-all.co.uk"
        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="••••••••"
        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
      >
        Sign in
      </button>
    </div>
  </div>
</body>
</html>
