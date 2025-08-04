import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addNewExamScheduleApi, getAllClassApi, getAllSubjectByClassApi, getRoomDataApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    .form-select, .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
    }
    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }


`;

const AddExam = ({ offlineExamState }) => {

    const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = useForm({
        mode: 'onChange'
    });

    const token = localStorage.getItem('token');
    const [allRoomData, setAllRoomData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [ExamTermData, setExamTermData] = useState([]);

    useEffect(() => {
        getAllRoomData();
        getAllClassData();
        // getAllExamTermData();
    }, [token])


    // const getAllExamTermData = async () => {
    //     try {
    //         var response = await getExamTermDataApi('', '', '');
    //         if (response?.status === 200) {
    //             if (response?.data?.status === 'success') {
    //                 setExamTermData(response?.data?.categories);
    //             }
    //         }
    //         else {
    //             // console.log(response?.data?.message);
    //         }
    //     }
    //     catch (error) {
    //         // console.log('Error while fetching exam category data: ', error);
    //     }
    // }

    const getAllClassData = async () => {
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            // console.log('Error while fetching class data: ', error);
        }
    }

    const getAllRoomData = async () => {
        try {
            var response = await getRoomDataApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllRoomData(response?.data?.rooms);
                }
            }
            else {
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            // console.log('Error while fetching room data: ', error);
        }
    }


    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">

                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddExam
