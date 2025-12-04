import React from 'react'
import BoxOfCard from '../components/BoxOfCards'
import { doctors } from '../assets/assets_frontend/assets'
import Button from '../components/Button'
import Footer from "../components/Footer";
import { useParams } from 'react-router';
import { useChangeSpeciality } from '../providers/ChangeSpecialityProvider';

const Doctors = () => {

  const { specialty } = useParams();

  const { setSpeciality } = useChangeSpeciality();

  setSpeciality(specialty);

  return <>
    <div className='flex gap-5 py-5 flex-column md:flex-row'>
      <div className='gap-3 flex-column'>
        <Button speciality="general-physician" />
        <Button speciality="gynecologist" />
        <Button speciality="dermatologist" />
        <Button speciality="pediatricians" />
        <Button speciality="neurologist" />
        <Button speciality="gastroenterologist" />
      </div>
      <BoxOfCard
        doctors={doctors}
      />
    </div>
    <Footer />
  </>
}

export default Doctors