import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
type FormProps = {
	title: string;
	getDataForm: (email: string, password: string, nickname?: string) => void;
};

type Inputs = {
	email: string;
	password: string;
	nickname?: string;
	pwConfirm?: string;
};

const UserAuthForm: FC<FormProps> = ({ title, getDataForm }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<Inputs>({
		mode: "onChange",
	});

	const onValid = (password: string, pwConfirm: string) => {
		if (title === "회원가입" && password !== pwConfirm) {
			setError(
				"pwConfirm",
				{ message: "비밀번호가 일치하지 않습니다." },
				{ shouldFocus: true }
			);

			return false;
		}
		return true;
	};

	const onSubmit: SubmitHandler<FieldValues> = ({
		email,
		password,
		nickname,
		pwConfirm,
	}) => {
		if (onValid(password, pwConfirm)) {
			getDataForm(email, password, nickname);
		}
	};

	const userEmail = {
		required: "필수 입력 정보입니다.",
		pattern: {
			value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
			message: "이메일 형식이 올바르지 않습니다.",
		},
	};

	const userPassword = {
		required: "필수 입력 정보입니다.",
		pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
			message: "8~20자의 알파벳,숫자,특수문자(@$!%*#?&) 조합",
		},
	};

	const userPasswordConfirm = {
		required: "필수 입력 정보입니다.",
	};

	const userName = {
		required: "필수 입력 정보입니다.",
		pattern: {
			value: /^[가-힇|A-Z|a-z\d]{4,10}$/,
			message: "4~10자의 한글,알파벳,숫자",
		},
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
			<div>
				<Label htmlFor="email">Email</Label>
				<Input
					type="text"
					id="email"
					placeholder="Email"
					className="w-64"
					{...register("email", userEmail)}
				/>
				<div className="ml-2 ">
					<span
						className="text-xs text-red-500"
						style={{ visibility: `${errors?.email ? "visible" : "hidden"}` }}
					>
						{errors?.email ? errors.email.message : "empty"}
					</span>
				</div>
			</div>

			<div>
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					id="password"
					placeholder="Password"
					{...register("password", userPassword)}
				/>
				<div className="ml-2" style={{ maxWidth: "256px" }}>
					<span
						className="text-xs text-red-500"
						style={{ visibility: `${errors?.password ? "visible" : "hidden"}` }}
					>
						{errors?.password ? errors.password.message : "empty"}
					</span>
				</div>
			</div>

			{title == "회원가입" && (
				<>
					<div>
						<Label htmlFor="pwConfirm">Password Confirm</Label>
						<Input
							type="password"
							id="pwConfirm"
							placeholder="Password Confirm"
							{...register("pwConfirm", userPasswordConfirm)}
						/>
						<div className="ml-2" style={{ maxWidth: "256px" }}>
							<span
								className="text-xs text-red-500"
								style={{
									visibility: `${errors?.pwConfirm ? "visible" : "hidden"}`,
								}}
							>
								{errors?.pwConfirm ? errors.pwConfirm.message : "empty"}
							</span>
						</div>
					</div>

					<div>
						<Label htmlFor="nickname">Nickname</Label>
						<Input
							type="text"
							id="nickname"
							placeholder="Nickname"
							{...register("nickname", userName)}
						/>
						<div className="ml-2 ">
							<span
								className="text-xs text-red-500"
								style={{
									visibility: `${errors?.nickname ? "visible" : "hidden"}`,
								}}
							>
								{errors?.nickname ? errors.nickname.message : "empty"}
							</span>
						</div>
					</div>
				</>
			)}
			<div className="text-center mt-10">
				<Button type="submit" className="w-full">
					{title}
				</Button>
			</div>
		</form>
	);
};

export default UserAuthForm;
