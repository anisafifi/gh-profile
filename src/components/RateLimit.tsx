interface RateLimitProps {
  rateLimit: {
    remaining: number;
    limit: number;
  };
}

const RateLimit: React.FC<RateLimitProps> = ({ rateLimit }) => (
  <div>
    {rateLimit && (
      <div className="limit absolute top-0 left-0 p-4">
        <div className="num text-grey text-xl mb-2">{`${rateLimit.remaining} / ${rateLimit.limit}`}</div>
        <p className="uppercase text-[10px] tracking-wider m-0 text-grey2">Requests Left</p>
      </div>
    )}
  </div>
);

export default RateLimit;