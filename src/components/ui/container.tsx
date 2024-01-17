export const Container = ({ children } : React.PropsWithChildren) => {
    return (
      <div className='w-full'>
        {children}
      </div>
    );
  };