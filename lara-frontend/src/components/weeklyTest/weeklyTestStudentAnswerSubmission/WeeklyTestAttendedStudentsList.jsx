// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Table, Container, Alert, Spinner, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { baseURL } from '../../config'; 
// import Paginate from '../../common/Paginate'; 

// const WeeklyTestAttendedStudentsList = () => {
//   const { wt_id } = useParams(); 
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;

//   useEffect(() => {
//     const fetchStudentEvaluationStatus = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/weekly-test/getStudentEvaluationStatusByWeeklyTestId/${wt_id}`);
//         setStudents(response.data.students);
//       } catch (error) {
//         setError('Failed to fetch student details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentEvaluationStatus();
//   }, [wt_id]);

//   if (loading) {
//     return (
//       <Container className="my-4">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-4">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   // Pagination Logic
//   const indexOfLastStudent = currentPage * itemsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
//   const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

//   return (
//     <Container className="my-4">
//       <h2 className="mb-4">Student Details</h2>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>  
//             <th>#</th>
//             <th>Student Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Evaluate</th>
//             <th>Evaluation Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentStudents.map((student, index) => (
//             <tr key={student.student_id}>
//               <td>{indexOfFirstStudent + index + 1}</td>
//               <td>{student.student_name}</td>
//               <td>{student.student_email}</td>
//               <td>{student.student_phone}</td>
//               <td>
//                 <Link to={`/evaluvate-student-answers/${wt_id}/${student.student_id}`}>Evaluate</Link>
//               </td>
//               <td>
//                 {student.is_evaluation_done ? (
//                   <Badge bg="success">Evaluation Done</Badge>
//                 ) : (
//                   <OverlayTrigger
//                     placement="top"
//                     overlay={<Tooltip>Evaluation not fully completed for this student</Tooltip>}
//                   >
//                     <Badge bg="danger">Evaluation Pending</Badge>
//                   </OverlayTrigger>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Pagination Component */}
//       <Paginate
//         currentPage={currentPage}
//         totalItems={students.length}
//         itemsPerPage={itemsPerPage}
//         onPageChange={setCurrentPage}  // Update the page number when a new page is selected
//       />
//     </Container>
//   );
// };

// export default WeeklyTestAttendedStudentsList;



import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Alert, Spinner, Badge, OverlayTrigger, Tooltip, Button, Form } from 'react-bootstrap';
import { baseURL } from '../../config';
import Paginate from '../../common/Paginate';
import { toast } from 'react-toastify';
import { cosineSimilarity, tokenizeAndVectorize } from './evaluvation/autoEvaluvateUtils';
import {  BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

const WeeklyTestAttendedStudentsList = () => {
  const { wt_id } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStudentEvaluationStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/weekly-test/getStudentEvaluationStatusByWeeklyTestId/${wt_id}`);
        setStudents(response.data.students);
        // console.log("response status : ", response)
      } catch (error) {
        setError('Failed to fetch student details.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentEvaluationStatus();
  }, [wt_id]);

  const handleSelectStudent = (student_id) => {
    setSelectedStudents((prev) =>
      prev.includes(student_id) ? prev.filter((id) => id !== student_id) : [...prev, student_id]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents(selectedStudents.length === students.length ? [] : students.map((s) => s.student_id));
  };
  const autoEvaluateAnswers = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student to evaluate.");
      return;
    }

    for (const student_id of selectedStudents) {
      const student = students.find((s) => s.student_id === student_id);
      const studentName = student ? student.student_name : `Student ${student_id}`; // Fallback if name isn't found

      try {
        const response = await axios.get(
          `${baseURL}/api/weekly-test/getQuestionAnswerDataByStudentId/${wt_id}/${student_id}`
        );
        const questions = response.data.questions;

        for (const question of questions) {
          const correctAnswerResponse = await axios.get(
            `${baseURL}/api/weekly-test/getCorrectAnswerForQuestion/${question.question_id}`
          );
          const correctAnswer = correctAnswerResponse.data.answer;
          const studentAnswer = question.studentAnswer?.answer || "";
          const keywords = correctAnswerResponse.data.keywords;

          console.log("answers : : ", keywords);

          // Convert answers to vectorized representations
          const correctAnswerVector = tokenizeAndVectorize(correctAnswer);
          const studentAnswerVector = tokenizeAndVectorize(studentAnswer);

          // Calculate similarity
          const similarity = cosineSimilarity(correctAnswerVector, studentAnswerVector);
          console.log("similarity:", similarity);

          // Set threshold based on keywords
          const threshold = keywords === "1" ? 0.8 : 0.6;
          const isCorrect = similarity >= threshold;


          const marks = isCorrect ? question.marks : 0;
          const comment = isCorrect ? `Correct Answer` : `Incorrect Answer`;

          try {
            await axios.put(
              `${baseURL}/api/weekly-test/updateMarksAndCommentByStudentId/${wt_id}/${student_id}/${question.question_id}`,
              { marks, comment }
            );
          } catch (error) {
            console.error("failed to update marks ", error)
          }
        }


        // await axios.put(`${baseURL}/api/weekly-test/updateEvaluationStatus/${wt_id}/${student_id}`, {
        //   is_evaluation_done: true,
        // });

        toast.success(`Evaluation completed for ${studentName}`);
      } catch (error) {
        console.error(`Error evaluating ${studentName}:`, error);
        toast.error(`Error evaluating ${studentName}`);
      }
    }

    setStudents((prev) =>
      prev.map((s) =>
        selectedStudents.includes(s.student_id) ? { ...s, is_evaluation_done: true } : s
      )
    );
    setSelectedStudents([]);
  };


  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Student Details</h2>
      <Button variant="primary" onClick={handleSelectAll} className="mb-2">
        {selectedStudents.length === students.length ? 'Deselect All' : 'Select All'}
      </Button>
      <Button variant="success" onClick={autoEvaluateAnswers} className="ms-2 mb-2">
        Auto Evaluate Selected
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={selectedStudents.length === students.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>#</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Attended in Lara</th>
            <th>Evaluate</th>
            <th>Evaluation Status</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student, index) => (
            <tr key={student.student_id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.includes(student.student_id)}
                  onChange={() => handleSelectStudent(student.student_id)}
                />
              </td>
              <td>{indexOfFirstStudent + index + 1}</td>
              <td>{student.student_name}</td>
              <td>{student.student_email}</td>
              <td>{student.student_phone}</td>
              <td>{student.attended_in_institute ? (<><BsCheckCircleFill className='text-success h4'/></>) : ( <><BsXCircleFill className='text-danger'  /></>) }</td>
              <td>
                <Link to={`/evaluvate-student-answers/${wt_id}/${student.student_id}`}>Evaluate</Link>
              </td>
              <td>
                {student.is_evaluation_done ? (
                  <Badge bg="success">Evaluation Done</Badge>
                ) : (
                  <OverlayTrigger placement="top" overlay={<Tooltip>Evaluation pending</Tooltip>}>
                    <Badge bg="danger">Evaluation Pending</Badge>
                  </OverlayTrigger>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Paginate
        currentPage={currentPage}
        totalItems={students.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default WeeklyTestAttendedStudentsList;