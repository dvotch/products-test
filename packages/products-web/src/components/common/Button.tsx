import clsx from 'clsx';

type Props = {
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, children, ...rest }: Props) => (
    <button
        className={clsx(
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer',
            className,
        )}
        type="button"
        {...rest}
    >
        {children}
    </button>
);
