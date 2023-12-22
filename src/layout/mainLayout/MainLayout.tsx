import  {ReactNode} from 'react'

interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = (layout:MainLayoutProps) => {
  
  return (
    <div className='
    z-0 w-full 
    h-screen flex
    justify-center 
    items-center'>
    {layout.children}    
  </div>
  )
}

export default MainLayout
