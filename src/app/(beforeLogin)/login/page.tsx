import RedirectToLogin from "@/app/(beforeLogin)/login/_component/RedirectToLogin";
import Main from "@/app/(beforeLogin)/_component/Main";

export default async function Login() {
  return (
    <>
      <RedirectToLogin />
      <Main/>
    </>
  );
}
