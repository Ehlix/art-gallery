import {FaAsterisk} from "react-icons/fa";

export function UserTimezone() {
  return (
    <div>
      <h3 className="mb-1 flex gap-1 text-xl text-t-hover-1">
        <FaAsterisk size={10} title="Required" className="cursor-help"/>
        Timezone
      </h3>
      <p className="mb-1 text-t-hover-1/80">
        This allows us to send you your daily digest right on time.
      </p>
      <input
        maxLength={100}
        type="text"
        placeholder=""
      />
      <span className="text-sm -tracking-tight text-t-error">
            {'errors'}
          </span>
    </div>
  );
}