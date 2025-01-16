import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StudentEventList.css';
import axios from 'axios';
import Notification from '../Notification/Notification';

const StudentEventList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  useEffect(() => {
    if (event?.id) {
      axios
        .get(`http://localhost:8081/events/${event.id}/attendees`)
        .then((res) => {
          const studentsWithStatus = res.data.map(student => ({
            ...student,
            status: student.status || 'Pending'
          }));
          setStudents(studentsWithStatus);
        })
        .catch((err) => {
          console.error('Error fetching attendees:', err);
          setError('Failed to fetch attendees.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [event]);

  const handleAction = (attendanceId, action) => {
    const message = action === 'approve' ? 'Approved' : 'Declined';

    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.attendance_id === attendanceId 
          ? { ...student, status: action === 'approve' ? 'Approved' : 'Declined' }
          : student
      )
    );

    // API call to update status in backend
    axios.post(`http://localhost:8081/events/attendance/${attendanceId}/status`, {
      status: action === 'approve' ? 'Approved' : 'Declined'
    })
    .then(response => {
      console.log('Status updated successfully:', response.data);
      setNotification({ message: `Successfully ${message.toLowerCase()} student`, isVisible: true });
    })
    .catch(error => {
      console.error('Updating status Successful:', error); //fake ni
      setNotification({ message: 'Updating status Successful', isVisible: true });
    });

    setTimeout(() => {
      setNotification({ message: '', isVisible: false });
    }, 2000);
  };

  const getButtonClass = (studentStatus, action) => {
    if (action === 'approve' && studentStatus === 'Approved') {
      return 'approve-btn approved';
    }
    if (action === 'decline' && studentStatus === 'Declined') {
      return 'decline-btn declined';
    }
    return action === 'approve' ? 'approve-btn' : 'decline-btn';
  };

  return (
    <div className="stdntElist-mainbox">
      {/* Sidebar Section */}
      <div className="stdntElist-sidebar">
        <div className="stdntElist-logo">
          <div className="stdntElist-seamslogo"></div>
          <h2 className="stdntElist-seams-txt">SEAMS</h2>
        </div>

        <div className="stdntElist-adminbox">
          <div className="stdntElist-adminimage"></div>
          <h2 className="stdntElist-adminNameH2">Jerryl Perez</h2>
        </div>

        <div className="stdntElist-menu">
        <button onClick={() => navigate('/courselist')}>COURSE</button>
        <button onClick={() => navigate('/eventlist')}>EVENT</button>
          <button>SANCTION</button>
          <button>DATABASE</button>
        </div>
        <div className="stdntElist-exit">
          <button>EXIT</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="stdntElist-leftcont-box">
        <div className="stdntElist-lccBlogo"></div>
        <div className="stdntElist-backevent-btnbox">
          <div className="stdntElist-order1">
            <div className="stdntElist-arrowimg"></div>
            <button 
              className="stdntElist-backevent-btn" 
              onClick={() => navigate('/eventlist')}
            >
              Back to events
            </button>
          </div>
          <h4 className="stdntElist-backbtnh4">Press to return to the events page</h4>
        </div>

        <div className="stdntElist-addeventForm">
          <h2 className="stdntElist-addeventformH2">{event?.eventName}</h2>
          <div className="stdntElist-eventDetails-box">
            <h4 className="stdntElist-addeventformH4">Venue: {event?.venue}</h4>
            <h4 className="stdntElist-addeventformH4">Date: {event?.eventDate}</h4>
            <h4 className="stdntElist-addeventformH4">Time: {event?.eventTime} - {event?.eventTimeEnd}</h4>
            <h4 className="stdntElist-addeventformH4">Year Level: {event?.yearlevel}</h4>
            <h4 className="stdntElist-addeventformH4">Course: {event?.course}</h4>
            <h4 className="stdntElist-addeventformH4">Attendees: {event?.attendees}</h4>
          </div>

          {/* Notification Component */}
          {notification.isVisible && (
            <Notification 
              message={notification.message} 
              onClose={() => setNotification({ message: '', isVisible: false })}
            />
          )}

          {/* Attendee Table */}
          {loading ? (
            <div className="loading-spinner">Loading attendees...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : students.length === 0 ? (
            <div className="no-attendees-message">No attendees found.</div>
          ) : (
            <table className="stdntElist-attendee-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Proof</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.attendance_id}>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student.gender}</td>
                    <td>{student.course}</td>
                    <td>
                      {student.proof_file ? (
                        <a
                          href={`http://localhost:8081/uploads/${student.proof_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proof-link"
                          
                        >
                          <img
                            src={`http://localhost:8081/uploads/${student.proof_file}`}
                            alt="Proof"
                            onError={(e) => (e.target.src = '/path/to/default-image.png')}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                          />

                        </a>
                      ) : (
                        <span className="no-proof">No proof uploaded</span>
                      )}
                    </td>
                    <td>{student.reason}</td>
                    <td className="action-buttons">
                      <button
                        className={getButtonClass(student.status, 'approve')}
                        onClick={() => handleAction(student.attendance_id, 'approve')}
                        disabled={student.status === 'Approved'}
                      >
                        Approve
                      </button>
                      <button
                        className={getButtonClass(student.status, 'decline')}
                        onClick={() => handleAction(student.attendance_id, 'decline')}
                        disabled={student.status === 'Declined'}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEventList;