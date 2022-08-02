import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import { getAllGoals, reset } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, messege, isSuccess, isError } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(messege);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getAllGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, messege, dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <>
        <section className="heading">
          <h1>Welcome {user && user.name} </h1>
          <p>Goals Dashboard</p>
        </section>
        <GoalForm />
        <section className="content">
          {goals.length > 0 ? (
            <>
              <div className="goals">
                {goals.map((goal) => (
                  <GoalItem key={goal._id} goal={goal} />
                ))}
              </div>
            </>
          ) : (
            <h3>You dont have any Goals buddy!!!</h3>
          )}
        </section>
      </>
    );
  }
}

export default Dashboard;
