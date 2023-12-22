import React from 'react'
import FirstSection from './FirstSection'
import FirstSectionContent from './FirstSectionContent'
import SecondSection from './SecondSection'
import SecondSectionContent from './SecondSectionContent'


const LeftLayout = () => {
  return (
    <div className="flex flex-row">
        <FirstSection>
            <FirstSectionContent/>
        </FirstSection>

       <SecondSection>
            <SecondSectionContent/>
       </SecondSection>
    </div>
  )
}

export default LeftLayout