import { ZodError, z } from "zod";
import { useState } from "react";

const SubscribeToNewsletter = () => {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    try {
      z.string().email({ message: "Must be a valid email!" }).parse(inputVal);

      setSuccess(true);
      setInputVal("");
      setTimeout(() => {
        setSuccess(false);
      }, 7500);
    } catch (errors) {
      if (errors instanceof ZodError) {
        setError(JSON.parse(errors.message)[0].message);
      } else {
        setError("Invalid value!");
      }
      console.error(errors);
    }
  };

  return (
    <div
      className="w-full flex flex-col gap-2 items-center m-auto"
      style={{
        width: "min(600px, 100%)",
      }}
    >
      <form
        className="flex gap-3 sm:flex-col mt-8 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className="focus:outline-none border-[1px] text-sm border-black py-5 px-9 rounded-full font-semibold placeholder:text-neutral-500 grow"
          placeholder="Your email"
          value={inputVal}
          onChange={(e) => {
            setError(null);
            setInputVal(e.target.value);
          }}
        />

        <button
          type="submit"
          className="px-9 sm:w-full py-5 h-auto bg-black text-white font-bold text-sm rounded-full"
        >
          Subscribe
        </button>
      </form>
      {error && <p className="text-sm font-semibold text-red-500 w-full text-left">{error}</p>}
      {success && (
        <p className="text-sm font-semibold text-center text-green-500 w-full text-left">
          Just kidding this is a demo site, you won't receive any emails... or would you?
        </p>
      )}
    </div>
  );
};
export default SubscribeToNewsletter;
