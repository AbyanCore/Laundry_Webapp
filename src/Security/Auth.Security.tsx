import Cookies from "js-cookie";
import Unauthorizepage from "../Pages/Error/Unauthorize.page";

const AuthSecurity = (TargetComponent: any) => {
    return (props: any) => {
        let valid: boolean = true;

        if (!valid) {
            Cookies.remove("token");
            return <Unauthorizepage />;
        } else {
            return (
                <div>
                    <TargetComponent {...props} />
                </div>
            );
        }
    };
};

export default AuthSecurity;
