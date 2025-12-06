import { nextStep } from "@/shared/slices/sidebar";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedPlan } = useAppSelector((state) => state.subscription);
  const { steps, currentStepIndex } = useAppSelector((state) => state.sidebar);

  const isDisabled = location.pathname === "/device";

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isDisabled) {
      alert("Next button disabled");
      return;
    }

    if (!selectedPlan) {
      alert("Select Plan");
      return;
    }

    dispatch(nextStep());

    if (currentStepIndex < steps.length - 1) {
      navigate(`/device`);
    }
  };

  return (
    <footer className="sticky-footer" aria-disabled={isDisabled}>
      <Link to={"/device"} onClick={handleNext}>
        <button
          className={`sticky-footer__button ${isDisabled ? "sticky-footer__button--disabled" : ""}`}
        >
          Next
        </button>
      </Link>
    </footer>
  );
}
