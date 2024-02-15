import { useEffect, useState } from 'react'

function Copyright() {
  const [currentYear, setCurrentYear] = useState<number>(0)
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    setCurrentYear(currentYear)
  }, [])
  return (
    <div
      className={`flex items-center justify-center w-full text-2xs opacity-40`}
    >
      Copyright &copy; {currentYear} by&nbsp;
      <a
        href="https://github.com/AveJaPl"
        target="_blank"
        className={`hover:underline font-semibold`}
      >
        AveJaPl
      </a>
      &nbsp;All rights reserved.
    </div>
  )
}

export default Copyright
