import cls from "./Loading.module.scss"
import Loader from "@assets/icons/loader.svg"
export const Loading = () => {
    return (
        <div className={cls.loading}>
            <Loader className={cls.icon}/>
        </div>
    );
};

