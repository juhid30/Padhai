import React, { useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const getStudentDetails = async (studentId) => {
  try {
    const studentDocRef = doc(db, "Student", studentId);
    const studentSnapshot = await getDoc(studentDocRef);

    if (studentSnapshot.exists()) {
      return studentSnapshot.data();
    } else {
      console.error("No student found with the given ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
    return null;
  }
};

const getAssignmentsForStudent = async () => {
  try {
    const assignmentsRef = collection(db, "AssignmentRecord");
    const querySnapshot = await getDocs(assignmentsRef);

    const allAssignments = [];
    querySnapshot.forEach((doc) => {
      allAssignments.push({ id: doc.id, ...doc.data() });
    });

    return allAssignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return [];
  }
};

const getEvents = async () => {
  try {
    const eventsRef = collection(db, "EventScheduling");
    const querySnapshot = await getDocs(eventsRef);

    const allEvents = [];
    querySnapshot.forEach((doc) => {
      allEvents.push({ id: doc.id, ...doc.data() });
    });

    return allEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAssignmentsAndStudentData = async () => {
      const studentId = "library-test-student";
      // localStorage.getItem("studentId");

      if (studentId) {
        try {
          const studentDetails = await getStudentDetails(studentId);
          if (studentDetails) {
            const studentYear = Number(studentDetails.year);

            const allAssignments = await getAssignmentsForStudent();

            const filteredAssignments = allAssignments
              .filter((assignment) => Number(assignment.year) === studentYear)
              .map((assignment) => ({
                title: assignment.topic,
                start: assignment.dos.toDate().toISOString(),
                end: assignment.dos.toDate().toISOString(),
              }));

            const allEvents = await getEvents();

            const filteredEvents = allEvents.map((event) => ({
              title: event.title,
              start: event.start,
              end: event.end,
            }));

            setEvents([...filteredAssignments, ...filteredEvents]);
          }
        } catch (error) {
          console.error(
            "Error fetching assignments or student details:",
            error
          );
        }
      }
    };

    fetchAssignmentsAndStudentData();
  }, []);

  return (
    <div className="w-full h-full relative bg-mint-green p-6 rounded-2xl shadow-lg border border-emerald-200">
      <Fullcalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="100%"
        events={events}
        buttonText={{
          today: "Today",
          prev: "←",
          next: "→",
        }}
        className="bg-white text-emerald-900 rounded-xl shadow-inner p-2"
        eventColor="#10b981" // Emerald green for events
        eventTextColor="#ffffff"
        eventBorderColor="#059669"
        dayHeaderClassNames="bg-emerald-100 text-emerald-900 font-semibold"
        dayCellClassNames="hover:bg-emerald-50 transition-colors duration-200"
        todayClassNames="bg-mint-green border-2 border-emerald-400"
        buttonClassNames="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-2 rounded-lg transition-colors duration-200"
        titleClassNames="text-emerald-900 font-bold text-xl"
      />
    </div>
  );
}

function Calendar() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-mint-green w-[92.5%] h-[100%] p-8 flex">
      <CalendarComponent />
    </div>
  );
}

export default Calendar;