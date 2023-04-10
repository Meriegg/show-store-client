import EditableText from "@/components/demo/EditableText";

export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <EditableText storageKey="EDITABLE_TEST" className="font-semibold text-3xl">
        Editable text!
      </EditableText>
    </main>
  );
}
