export function Input({
  onChange,
  placeHolder,
}: {
  onChange: () => void;
  placeHolder?: string;
}) {
  return (
    <div>
      <input
        type="text"
        className="py-2 border border-black rounded my-2 px-4"
        // onChange={onchange}
        placeholder={placeHolder}
      />
    </div>
  );
}
