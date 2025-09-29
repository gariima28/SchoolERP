import React, { useEffect, useState } from 'react'
import { getAllDashDataApi, getSchoolDataApi } from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';
import { Link, useNavigate } from 'react-router-dom';

const SchoolDashboard = ({ data }) => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('loggedInUserRole');

    //loader State
    const [loaderStatee, setloaderStatee] = useState(false);
    const [schoolData, setSchoolData] = useState([]);

    useEffect(() => {
        console.log(data, 'scholsndnk')
        if (role === 'SUPERADMIN') {
            getAllDashData();
        }
    }, [])

    const getAllDashData = async () => {
        try {
            setloaderStatee(true);
            var response = await getAllDashDataApi('', '', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    console.log(response.data)
                    setSchoolData(response?.data?.data?.schools);
                    setloaderStatee(false);
                }
            }
            else {
                setloaderStatee(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderStatee(false);
            setloaderStatee(false);
            console.error('Error fetching student data:', error);
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }
        }
        finally {
            setloaderState(false);
        }
    }

    return (
        <>
            {
                loaderStatee && (
                    <DataLoader />
                )
            }
            <div className="container-fluid">
                <div className="row">
                    <table className="table mt-2 mb-0">
                        <tbody>
                            {schoolData.slice(0, 8).map((item) => (
                                <tr key={item.id}>
                                    <td className='greyText'><h3>{item.schoolName}</h3></td>
                                    <td>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                                    <td className='text-end'><Link className='text-center text-black text-decoration-none viewDetailsButtons p-1' to={`/superadmin/schools/viewSchoolDetails/${item.schoolBusinessId}`}><span>View Details</span></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SchoolDashboard
