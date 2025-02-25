import React, { useEffect, useState } from 'react';
import './EventManagement.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateEvent from '../UpdateEvent/UpdateEvent'; // Import UpdateEvent component
import ViewEvent from '../ViewEvent/ViewEvent'; // Import ViewEvent component

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // Modal state for ViewEvent
  const [selectedEvent, setSelectedEvent] = useState(null); // Event being viewed or updated
  const [buttonState, setButtonState] = useState({}); // State to track the button state for each event
  const navigate = useNavigate();

  const gotoAddNewEvent = () => {
    navigate('/addeventform');
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/events');
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Could not fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleUpdateClick = (event) => {
    setSelectedEvent(event); // Set the selected event
    setShowUpdateModal(true); // Open the update modal
  };

  const handleViewClick = (event) => {
    setSelectedEvent(event); // Set the selected event for viewing
    setShowViewModal(true); // Open the view modal
  };

  const handleModalClose = () => {
    setShowUpdateModal(false); // Close the update modal
    setShowViewModal(false); // Close the view modal
    setSelectedEvent(null); // Clear selected event
  };

  const handleEventUpdate = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  // Format date as dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Group and sort events by month and year
  const groupAndSortEventsByMonth = (events) => {
    const grouped = events.reduce((groups, event) => {
      const eventDate = new Date(event.eventDate);
      const eventMonth = eventDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[eventMonth]) {
        groups[eventMonth] = [];
      }
      groups[eventMonth].push(event);
      return groups;
    }, {});

    return Object.entries(grouped)
      .sort(([monthA], [monthB]) => {
        const [monthYearA, monthYearB] = [new Date(monthA), new Date(monthB)];
        return monthYearB - monthYearA; // Descending order
      })
      .reduce((sortedGroups, [key, value]) => {
        sortedGroups[key] = value;
        return sortedGroups;
      }, {});
  };

  const groupedAndSortedEvents = groupAndSortEventsByMonth(events);

  const handleDeleteClick = async (eventId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this event?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8081/events/${eventId}`);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        alert('Event deleted successfully');
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('An error occurred while deleting the event. Please try again.');
      }
    }
  };

  const handleApproveClick = (eventId) => {
    setButtonState((prevState) => ({
      ...prevState,
      [eventId]: 'approved', // Set the state to "approved"
    }));
    alert('Event approved');
  };

  const handleDeclineClick = (eventId) => {
    setButtonState((prevState) => ({
      ...prevState,
      [eventId]: 'declined', // Set the state to "declined"
    }));
    alert('Event declined');
  };

  return (
    <div className="eventList-mainbox">
      {/* Sidebar Section */}
      <div className="eventList-sidebar">
        <div className="eventList-logo">
          <div className="eventList-seamslogo"></div>
          <h2 className="eventList-seams-txt">SEAMS</h2>
        </div>

        <div className="eventList-adminbox">
          <div className="eventList-adminimage"></div>
          <h2 className="eventList-adminNameH2">Program Head</h2>
        </div>

        <div className="eventList-menu">
          <button onClick={() => navigate('/courselist')}>COURSE</button>
          <button onClick={() => navigate('/eventlist')}>EVENT</button>
          <button>SANCTION</button>
          <button>DATABASE</button>
        </div>
        <div className="eventList-exit">
          <div className="eventList-exitimg"></div>
          <button>EXIT</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="eventList-leftcont-box">
        <div className="eventList-logoboxlcc">
          <div className="eventList-lccBlogo"></div>
        </div>

        <div className="eventList-addeventForm">
          <h2 className="eventList-addeventformH2">Pending Events</h2>
          <h4 className="eventList-addeventformH4">Explore and manage all activities in the system.</h4>

          {loading ? (
            <p>Loading events...</p>
          ) : error ? (
            <p>{error}</p>
          ) : events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            Object.entries(groupedAndSortedEvents).map(([month, monthEvents]) => (
              <div key={month} className="eventList-month-card">
                <h3 className="eventList-month-title">{month}</h3>
                <table className="eventList-event-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>End</th>
                      <th>Year Level</th>
                      <th>Course</th>
                      <th>Sanction</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthEvents.map((event) => (
                      <tr key={event.id}>
                        <td>{event.eventName}</td>
                        <td>{event.venue}</td>
                        <td>{formatDate(event.eventDate)}</td>
                        <td>{event.eventTime}</td>
                        <td>{event.eventTimeEnd}</td>
                        <td>{event.yearlevel}</td>
                        <td>{event.course}</td>
                        <td>{event.sanction}</td>

                        <td className="eventList-actions">
                          {/* Approve Button (will be hidden if event is declined or approved) */}
                          {buttonState[event.id] !== 'declined' && buttonState[event.id] !== 'approved' && (
                            <button
                              onClick={() => handleApproveClick(event.id)} // Approve event
                              className="eventList-approvebtn"
                            >
                              Approve
                            </button>
                          )}

                          {/* Decline Button (will be hidden if event is declined or approved) */}
                          {buttonState[event.id] !== 'declined' && buttonState[event.id] !== 'approved' && (
                            <button
                              onClick={() => handleDeclineClick(event.id)} // Decline event
                              className="eventList-declinebtn"
                            >
                              Decline
                            </button>
                          )}

                          {/* "Approved" Text if approved */}
                          {buttonState[event.id] === 'approved' && (
                            <span className="approved-text">Approved</span>
                          )}

                          {/* "Declined" Text if declined */}
                          {buttonState[event.id] === 'declined' && (
                            <span className="declined-text">Declined</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Update Event Modal */}
      {showUpdateModal && selectedEvent && (
        <UpdateEvent
          event={selectedEvent}
          onClose={handleModalClose}
          onUpdate={handleEventUpdate}
        />
      )}

      {/* View Event Modal */}
      {showViewModal && selectedEvent && (
        <ViewEvent
          event={selectedEvent}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default EventList;
