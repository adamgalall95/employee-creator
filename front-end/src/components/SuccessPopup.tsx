type SuccessPopupProps = {
  message: string;
};

export function SuccessPopup({ message }: SuccessPopupProps) {
  return (
    <div className="fixed right-[1em] top-[1em] rounded-lg bg-green-600 px-[1em] py-[0.75em] text-white shadow-lg">
      {message}
    </div>
  );
}
