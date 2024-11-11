import React from "react";

export default function ErrorMessage({ error }: { error?: string }) {
  if (!error) return <></>;
  return (
    <p className="pb-4 text-red-500">
      <b className="inline-block px-2 text-sm bg-red-500 text-white rounded mr-1">
        !
      </b>
      {error}
    </p>
  );
}
