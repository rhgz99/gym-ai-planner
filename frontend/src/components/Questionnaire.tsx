import { Button, Select } from "../components/ui";
import { useForm } from "react-hook-form";
import type { QuestionnaireData } from "../types";

const Questionnaire = () => {
  const { register, handleSubmit, reset } = useForm<QuestionnaireData>({
    mode: "onChange",
  });

  const onSubmit = async (data: QuestionnaireData) => {
    console.log(data);
    reset();
  };

  const goalsOptions = [
    { value: "build_muscle", option: "Build Muscle" },
    { value: "strength", option: "Gain Strength" },
    { value: "lose_weight", option: "Lose Weight" },
    { value: "endurance", option: "Improve Endurance" },
    { value: "active_and_healthy", option: "Stay Active and Healthy" },
  ];

  const experienceOptions = [
    { value: "beginner", option: "Beginner (0-1 years)" },
    { value: "intermediate", option: "Intermediate(1-3 years)" },
    { value: "advanced", option: "Advance(3-5 years)" },
    { value: "athlete", option: "Athlete(5+ years)" },
  ];

  const daysOptions = [
    { value: "2", option: "2 days per week (Beginner)" },
    { value: "3", option: "3 days per week (Standard)" },
    { value: "4", option: "4 days per week (Optimal balance)" },
    { value: "5", option: "5 days per week (Advanced)" },
    { value: "6", option: "6 days per week (High intensity)" },
  ];

  const sessionOptions = [
    { value: "20", option: "20 minutes (Quick workout)" },
    { value: "30", option: "30 minutes (Standard session)" },
    { value: "45", option: "45 minutes (Optimal balance)" },
    { value: "60", option: "60 minutes (Full training)" },
    { value: "90", option: "90 minutes (Extended/Advanced)" },
  ];

  const splitOptions = [
    { value: "full_body", option: "Full Body" },
    { value: "upper_lower", option: "Upper/Lower Split" },
    { value: "push_pull_legs", option: "Push/Pull/Legs" },
    {
      value: "bro_split",
      option: "Bro Split (Chest, Back, Arms, Legs, Shoulders)",
    },
    { value: "custom", option: "Custom (Let the AI planner decide)" },
  ];

  const equipmentOptions = [
    { value: "full_gym", option: "Gym Equipment (Full access)" },
    { value: "home_no_equipment", option: "Home (No equipment)" },
    {
      value: "home_basic",
      option: "Home (Basic equipment: dumbbells, jump rope)",
    },
    { value: "outdoor", option: "Outdoor (Bodyweight/Running)" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 max-w-lg mx-6 m-20 p-8 lg:p-10  md:mx-auto border border-border rounded-lg text-foreground"
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-primary">
          Let's create your training plan
        </h1>
        <p className="text-sm text-muted">
          Answer a few quick questions and I’ll build your perfect workout plan.
        </p>
      </div>
      <Select
        id="select-goal"
        label="What's your main goal?"
        options={goalsOptions}
        {...register("selectedGoal")}
      />
      <Select
        id="select-experience"
        label="How experienced are you with training?"
        options={experienceOptions}
        {...register("experienceLevel")}
      />
      <Select
        id="select-days"
        label="How many days do you usually train per week?"
        options={daysOptions}
        {...register("daysPerWeek")}
      />
      <Select
        id="select-session"
        label="How long do you want each session to last?"
        options={sessionOptions}
        {...register("sessionDuration")}
      />
      <Select
        id="select-split"
        label="How do you want to split your training?"
        options={splitOptions}
        {...register("selectedSplit")}
      />
      <Select
        id="select-equipment"
        label="What equipment do you have access to?"
        options={equipmentOptions}
        {...register("equipmentAvailable")}
      />
      <Button type="submit" variant="primary" className="text-lg">
        Generate your plan
      </Button>
    </form>
  );
};

export default Questionnaire;
