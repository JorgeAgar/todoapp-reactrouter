import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Tasks() {
  return (
    <div>
      <Header />
      <main>tasks</main>
    </div>
  );
}

function Header() {
  return (
    <header className="w-full flex flex-row justify-between items-center bg-black p-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
