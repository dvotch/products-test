import clsx from 'clsx';

type Props = {
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CustomInput = ({ className, ...rest }: Props) => (
    <input className={clsx('border p-2', className)} {...rest} />
);
