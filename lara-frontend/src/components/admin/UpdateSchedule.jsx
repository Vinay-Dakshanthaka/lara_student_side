import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';



// return (
//     <div className="container my-4">
//         <h2 className='my-4'>Update Schedule</h2>
//         <div className="accordion accordion-flush" id="accordionFlushExample">
//             <div className="accordion-item w-50">
//                 <h2 className="accordion-header" id="flush-headingOne">
//                 <button className="accordion-button collapsed fw-bold border border-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//                     Available Batches
//                 </button>
//                 </h2>

//                 {/* Rendering Available Batches */}
//                 <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
//                     {availableBatches.map((batches) => {
//                         return (
//                         <div class="accordion-body" key={batches.batch_id}>
//                             {batches.batch_name}
//                         </div>);
//                     })}
                
//                 </div>
//             </div>
//         </div>    


//             {/* <h3>Available Batches</h3> */}
//             {/* <ul className='list-group-item'>
//                 {availableBatches.map((batches) => {
//                     return <li key={batches.batch_id}>{batches.batch_name}</li>
//                 })}
//             </ul> */}
        
//         <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//                 <label htmlFor="todayScheduleInput" className="form-label">Today's Schedule</label>
//                 <textarea className="form-control" id="todayScheduleInput" rows="3" value={todaySchedule} onChange={(e) => setTodaySchedule(e.target.value)}></textarea>
//             </div>
//             {/* <div className="mb-3">
//                 <label htmlFor="tomorrowScheduleInput" className="form-label">Tomorrow's Schedule</label>
//                 <textarea className="form-control" id="tomorrowScheduleInput" rows="3" value={tomorrowSchedule} onChange={(e) => setTomorrowSchedule(e.target.value)}></textarea>
//             </div> */}
//             <button type="submit" className="btn btn-primary my-3">Update Schedule</button>
//         </form>
//         <div className="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
//             <div className="d-flex">
//                 <div className="toast-body">
//                     Schedule Updated Successfully
//                 </div>
//                 <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
//             </div>
//         </div>
//         <div className="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
//             <div className="d-flex">
//                 <div className="toast-body">
//                     Something went wrong
//                 </div>
//                 <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
//             </div>
//         </div>
//     </div>
// );
    
//update BAtch schedule according to batches    13-06-2024
// const UpdateSchedule = () => {
//     const [id, setId] = useState('');
//     const [todaySchedule, setTodaySchedule] = useState('');
//     const [showSuccessToast, setShowSuccessToast] = useState(false);
//     const [showErrorToast, setShowErrorToast] = useState(false);
//     const [availableBatches, setAvailableBatches] = useState([]);
//     const [selectedBatches, setSelectedBatches] = useState([]);

//     // Fetching Available Batches
//     const fetchAvailableBatches = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 return;
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const response = await axios.get(`${baseURL}/api/student/getAllBatches`, config);
//             setAvailableBatches(response.data);
//         } catch (error) {
//             console.error('Error fetching batches:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAvailableBatches();
//     }, []);

//     useEffect(() => {
//         const fetchHomeContent = async () => {
//             try {
//                 const response = await axios.get(`${baseURL}/api/student/fetchHomeContent`);
//                 const data = response.data[0]; 
//                 setId(data.id);
//                 setTodaySchedule(formatSchedule(data.today_schedule));
//             } catch (error) {
//                 console.error('Error fetching home content:', error);
//             }
//         };
    
//         fetchHomeContent();
//     }, []);
    
//     // Function to format schedule URLs
//     const formatSchedule = (schedule) => {
//         const urls = schedule.split(/\s+/).map(url => url.trim());
//         return urls.join('\n');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 return;
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const batchSchedules = selectedBatches.map(batchId => ({
//                 batch_id: batchId,
//                 schedule: todaySchedule
//             }));

//             await axios.post(`${baseURL}/api/student/saveOrUpdateHomeContent`, {
//                 batchSchedules
//             }, config);
//             setShowSuccessToast(true);
//             console.log("Schedule Updated Successfully");
//         } catch (error) {
//             console.error('Error updating home content:', error);
//             setShowErrorToast(true);
//         }
//     };

//     const handleBatchSelection = (batch_id) => {
//         setSelectedBatches(prevSelected => 
//             prevSelected.includes(batch_id) 
//             ? prevSelected.filter(id => id !== batch_id) 
//             : [...prevSelected, batch_id]
//         );
//     };

//     return (
//         <div className="container my-4">
//             <h2 className='my-4'>Update Schedule</h2>
//             <div className="accordion accordion-flush w-50" id="accordionFlushExample">
//                 <div className="accordion-item">
//                     <h2 className="accordion-header" id="flush-headingOne">
//                         <button className="accordion-button collapsed fw-bold border border-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//                             Available Batches
//                         </button>
//                     </h2>

//                     <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
//                         {availableBatches.map((batch) => (
//                             <div className="accordion-body" key={batch.batch_id}>
//                                 <input 
//                                     type="checkbox" 
//                                     id={`batch-${batch.batch_id}`} 
//                                     checked={selectedBatches.includes(batch.batch_id)} 
//                                     onChange={() => handleBatchSelection(batch.batch_id)} 
//                                 />
//                                 <label htmlFor={`batch-${batch.batch_id}`} className="ms-2">{batch.batch_name}</label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {selectedBatches.length > 0 && (
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="todayScheduleInput" className="form-label">Today's Schedule</label>
//                         <textarea 
//                             className="form-control" 
//                             id="todayScheduleInput" 
//                             rows="3" 
//                             value={todaySchedule} 
//                             onChange={(e) => setTodaySchedule(e.target.value)}>
//                         </textarea>
//                     </div>
//                     <button type="submit" className="btn btn-primary my-3">Update Schedule</button>
//                 </form>
//             )}

//             <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
//                 <div id="successToast" className={`toast ${showSuccessToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
//                     <div className="toast-header text-white bg-success">
//                         <strong className="me-auto">Success</strong>
//                         <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowSuccessToast(false)}></button>
//                     </div>
//                     <div className="toast-body">
//                         Schedule Updated Successfully
//                     </div>
//                 </div>

//                 <div id="errorToast" className={`toast ${showErrorToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
//                     <div className="toast-header text-white bg-danger">
//                         <strong className="me-auto">Error</strong>
//                         <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowErrorToast(false)}></button>
//                     </div>
//                     <div className="toast-body">
//                         Something went wrong
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const UpdateSchedule = () => {
    const [todaySchedule, setTodaySchedule] = useState({});
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [availableBatches, setAvailableBatches] = useState([]);
    const [selectedBatches, setSelectedBatches] = useState([]);
    const [batchSchedules, setBatchSchedules] = useState([]);

    // Fetching Available Batches
    const fetchAvailableBatches = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`${baseURL}/api/student/getAllBatches`, config);
            setAvailableBatches(response.data);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    useEffect(() => {
        fetchAvailableBatches();
    }, []);

    useEffect(() => {
        const fetchHomeContent = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/student/fetchHomeContent`);
                const data = response.data;
                const schedules = {};
                data.forEach(item => {
                    schedules[item.batch_id] = item.today_schedule;
                });
                setTodaySchedule(schedules);
                setBatchSchedules(data);
            } catch (error) {
                console.error('Error fetching home content:', error);
            }
        };
    
        fetchHomeContent();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const batchSchedules = selectedBatches.map(batchId => ({
                batch_id: batchId,
                schedule: todaySchedule[batchId] || ''
            }));

            await axios.post(`${baseURL}/api/student/saveOrUpdateHomeContent`, {
                batchSchedules
            }, config);
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
            console.log("Schedule Updated Successfully");
        } catch (error) {
            console.error('Error updating home content:', error);
            setShowErrorToast(true);
            setTimeout(() => setShowErrorToast(false), 3000);
        }
    };

    const handleBatchSelection = (batch_id) => {
        setSelectedBatches(prevSelected => 
            prevSelected.includes(batch_id) 
            ? prevSelected.filter(id => id !== batch_id) 
            : [...prevSelected, batch_id]
        );
    };

    const handleScheduleChange = (batch_id, schedule) => {
        setTodaySchedule(prevSchedules => ({
            ...prevSchedules,
            [batch_id]: schedule
        }));
    };

    return (
        <div className="container my-4">
            {/* <h2 className='my-4'>Today's Schedules</h2> */}
            {batchSchedules.map((batch) => (
                <div key={batch.batch_id}>
                    <h5>{availableBatches.find(b => b.batch_id === batch.batch_id)?.batch_name}</h5>
                    <pre className='fs-6'>{todaySchedule[batch.batch_id]}</pre>
                </div>
            ))}
            
            <h2 className='my-4'>Update Schedule</h2>
            <div className="accordion accordion-flush w-50" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed fw-bold border border-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Available Batches
                        </button>
                    </h2>

                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        {availableBatches.map((batch) => (
                            <div className="accordion-body" key={batch.batch_id}>
                                <input 
                                    type="checkbox" 
                                    id={`batch-${batch.batch_id}`} 
                                    checked={selectedBatches.includes(batch.batch_id)} 
                                    onChange={() => handleBatchSelection(batch.batch_id)} 
                                />
                                <label htmlFor={`batch-${batch.batch_id}`} className="ms-2">{batch.batch_name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedBatches.length > 0 && (
                <form onSubmit={handleSubmit}>
                    {selectedBatches.map(batchId => (
                        <div className="mb-3" key={batchId}>
                            <label htmlFor={`todayScheduleInput-${batchId}`} className="form-label">Today's Schedule for Batch {availableBatches.find(b => b.batch_id === batchId)?.batch_name}</label>
                            <textarea 
                                className="form-control" 
                                id={`todayScheduleInput-${batchId}`} 
                                rows="3" 
                                value={todaySchedule[batchId] || ''} 
                                onChange={(e) => handleScheduleChange(batchId, e.target.value)}>
                            </textarea>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary my-3">Update Schedule</button>
                </form>
            )}

            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                <div id="successToast" className={`toast ${showSuccessToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-white bg-success">
                        <strong className="me-auto">Success</strong>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowSuccessToast(false)}></button>
                    </div>
                    <div className="toast-body">
                        Schedule Updated Successfully
                    </div>
                </div>

                <div id="errorToast" className={`toast ${showErrorToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-white bg-danger">
                        <strong className="me-auto">Error</strong>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowErrorToast(false)}></button>
                    </div>
                    <div className="toast-body">
                        Something went wrong
                    </div>
                </div>
            </div>
        </div>
    );
};



// const UpdateSchedule = () => {
//     const [todaySchedule, setTodaySchedule] = useState('');
//     const [showSuccessToast, setShowSuccessToast] = useState(false);
//     const [showErrorToast, setShowErrorToast] = useState(false);
//     const [availableBatches, setAvailableBatches] = useState([]);
//     const [selectedBatches, setSelectedBatches] = useState([]);
//     const [batchschedules, setBatchSchedules] = useState({});
    
    
//         const fetchSchedule = async (req, res) => {
//             try{
//                 const token = localStorage.getItem("token");
//                 if(!token){
//                     return;
//                 }

//                 const config = {
//                     headers : {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//                 const response = await axios.get(`${baseURL}/api/student/saveOrUpdateHomeContent`, config);
//                 setBatchSchedules(response.data);
//             }
//             catch(error){
    
//             }    
//         }

    
        


    
//     // Fetching Available Batches
//     const fetchAvailableBatches = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 return;
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const response = await axios.get(`${baseURL}/api/student/getAllBatches`, config);
//             setAvailableBatches(response.data);
//         } catch (error) {
//             console.error('Error fetching batches:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAvailableBatches();
//         fetchSchedule();
//     }, []);

//     useEffect(() => {
//         const fetchHomeContent = async () => {
//             try {
//                 const response = await axios.get(`${baseURL}/api/student/fetchHomeContent`);
//                 const data = response.data[0];
//                 setTodaySchedule(formatSchedule(data.today_schedule));
//             } catch (error) {
//                 console.error('Error fetching home content:', error);
//             }
//         };

//         fetchHomeContent();
//     }, []);

//     // Function to format schedule URLs
//     const formatSchedule = (schedule) => {
//         const urls = schedule.split(/\s+/).map(url => url.trim());
//         return urls.join('\n');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 return;
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const batchSchedules = selectedBatches.map(batchId => ({
//                 batch_id: batchId,
//                 schedule: todaySchedule
//             }));

//             await axios.post(`${baseURL}/api/student/saveOrUpdateHomeContent`, {
//                 batchSchedules
//             }, config);
//             setShowSuccessToast(true);
//             console.log("Schedule Updated Successfully");
//         } catch (error) {
//             console.error('Error updating home content:', error);
//             setShowErrorToast(true);
//         }
//     };

//     const handleBatchSelection = (batch_id) => {
//         setSelectedBatches(prevSelected =>
//             prevSelected.includes(batch_id)
//                 ? prevSelected.filter(id => id !== batch_id)
//                 : [...prevSelected, batch_id]
//         );
//     };

//     return (
//         <div className="container my-4">
//             <h2 className='my-4'>Update Schedule</h2>
//             <div className="accordion accordion-flush w-50" id="accordionFlushExample">
//                 <div className="accordion-item">
//                     <h2 className="accordion-header" id="flush-headingOne">
//                         <button className="accordion-button collapsed fw-bold border border-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//                             Available Batches
//                         </button>
//                     </h2>

//                     <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
//                         {availableBatches.map((batch) => (
//                             <div className="accordion-body" key={batch.batch_id}>
//                                 <input
//                                     type="checkbox"
//                                     id={`batch-${batch.batch_id}`}
//                                     checked={selectedBatches.includes(batch.batch_id)}
//                                     onChange={() => handleBatchSelection(batch.batch_id)}
//                                 />
//                                 <label htmlFor={`batch-${batch.batch_id}`} className="ms-2">{batch.batch_name}</label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {selectedBatches.length > 0 && (
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="todayScheduleInput" className="form-label">Today's Schedule</label>
//                         <textarea
//                             className="form-control"
//                             id="todayScheduleInput"
//                             rows="3"
//                             value={todaySchedule}
//                             onChange={(e) => setTodaySchedule(e.target.value)}>
//                         </textarea>
//                     </div>
//                     <button type="submit" className="btn btn-primary my-3">Update Schedule</button>
//                 </form>
//             )}

//             <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
//                 <div id="successToast" className={`toast ${showSuccessToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
//                     <div className="toast-header text-white bg-success">
//                         <strong className="me-auto">Success</strong>
//                         <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowSuccessToast(false)}></button>
//                     </div>
//                     <div className="toast-body">
//                         Schedule Updated Successfully
//                     </div>
//                 </div>

//                 <div id="errorToast" className={`toast ${showErrorToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
//                     <div className="toast-header text-white bg-danger">
//                         <strong className="me-auto">Error</strong>
//                         <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowErrorToast(false)}></button>
//                     </div>
//                     <div className="toast-body">
//                         Something went wrong
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const UpdateSchedule = () => {
//     const [todaySchedule, setTodaySchedule] = useState('');
//     const [showSuccessToast, setShowSuccessToast] = useState(false);
//     const [showErrorToast, setShowErrorToast] = useState(false);
//     const [availableBatches, setAvailableBatches] = useState([]);
//     const [selectedBatches, setSelectedBatches] = useState([]);
//     const [batchSchedules, setBatchSchedules] = useState({});

//     // Fetch Available Batches
//     const fetchAvailableBatches = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 return;
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const response = await axios.get(`${baseURL}/api/student/getAllBatches`, config);
//             setAvailableBatches(response.data);
//         } catch (error) {
//             console.error('Error fetching batches:', error);
//         }
//     };

//     // Fetch Batch Schedules
//     const fetchBatchSchedules = async () => {
//         try {
//             const response = await axios.get(`${baseURL}/api/student/getBatchSchedules`);
//             setBatchSchedules(response.data);
//         } catch (error) {
//             console.error('Error fetching batch schedules:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAvailableBatches();
//         fetchBatchSchedules();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 return;
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const batchSchedulesData = selectedBatches.map(batchId => ({
//                 batch_id: batchId,
//                 schedule: todaySchedule
//             }));

//             await axios.post(`${baseURL}/api/student/saveOrUpdateHomeContent`, {
//                 batchSchedules: batchSchedulesData
//             }, config);
//             setShowSuccessToast(true);
//             console.log("Schedule Updated Successfully");
//             fetchBatchSchedules();
//         } catch (error) {
//             console.error('Error updating home content:', error);
//             setShowErrorToast(true);
//         }
//     };

//     const handleBatchSelection = (batch_id) => {
//         setSelectedBatches(prevSelected => 
//             prevSelected.includes(batch_id) 
//             ? prevSelected.filter(id => id !== batch_id) 
//             : [...prevSelected, batch_id]
//         );
//     };

//     return (
//         <div className="container my-4">
//             <h2 className='my-4'>Update Schedule</h2>
//             <div className="accordion accordion-flush w-50" id="accordionFlushExample">
//                 <div className="accordion-item">
//                     <h2 className="accordion-header" id="flush-headingOne">
//                         <button className="accordion-button collapsed fw-bold border border-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//                             Available Batches
//                         </button>
//                     </h2>

//                     <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
//                         {availableBatches.map((batch) => (
//                             <div className="accordion-body" key={batch.batch_id}>
//                                 <input 
//                                     type="checkbox" 
//                                     id={`batch-${batch.batch_id}`} 
//                                     checked={selectedBatches.includes(batch.batch_id)} 
//                                     onChange={() => handleBatchSelection(batch.batch_id)} 
//                                 />
//                                 <label htmlFor={`batch-${batch.batch_id}`} className="ms-2">{batch.batch_name}</label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {selectedBatches.length > 0 && (
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="todayScheduleInput" className="form-label">Today's Schedule</label>
//                         <textarea 
//                             className="form-control" 
//                             id="todayScheduleInput" 
//                             rows="3" 
//                             value={todaySchedule} 
//                             onChange={(e) => setTodaySchedule(e.target.value)}>
//                         </textarea>
//                     </div>
//                     <button type="submit" className="btn btn-primary my-3">Update Schedule</button>
//                 </form>
//             )}

//             <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
//                 <div id="successToast" className={`toast ${showSuccessToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
//                     <div className="toast-header text-white bg-success">
//                         <strong className="me-auto">Success</strong>
//                         <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowSuccessToast(false)}></button>
//                     </div>
//                     <div className="toast-body">
//                         Schedule Updated Successfully
//                     </div>
//                 </div>

//                 <div id="errorToast" className={`toast ${showErrorToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
//                     <div className="toast-header text-white bg-danger">
//                         <strong className="me-auto">Error</strong>
//                         <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowErrorToast(false)}></button>
//                     </div>
//                     <div className="toast-body">
//                         Something went wrong
//                     </div>
//                 </div>
//             </div>

//             <h2 className='my-4'>Batch Schedules</h2>
//             {Object.keys(batchSchedules).map(batchId => (
//                 <div key={batchId} className="mb-3">
//                     <h5>{batchSchedules[batchId].batch_name}</h5>
//                     <p>{batchSchedules[batchId].schedule}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

export default UpdateSchedule;

