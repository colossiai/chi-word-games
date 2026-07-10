interface ExplanationBoxProps {
  correct: boolean;
  explanation: string;
}

/** 作答後顯示對錯回饋與解釋 */
export default function ExplanationBox({ correct, explanation }: ExplanationBoxProps) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 ${
        correct ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
      }`}
    >
      <p className={`mb-1 font-bold ${correct ? 'text-green-700' : 'text-amber-700'}`}>
        {correct ? '答對了！👏' : '再想想 🤔'}
      </p>
      <p className="leading-relaxed text-slate-700">{explanation}</p>
    </div>
  );
}
