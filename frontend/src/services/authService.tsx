import accounts from "@/data/Accounts.json";

export async function mockLogin(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 500)); // simulate network delay

  const user = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!user) throw new Error("Invalid email or password");
  console.log(user)
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar : user.avatar
    },
    token: btoa(`${email}:${Date.now()}`) // mock token
  };
}
