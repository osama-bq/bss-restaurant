import { useAppSelector } from "../../app/store/hooks";

export default function DashboardPage() {
  const { data, loaded } = useAppSelector((state) => state.dashboard);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
