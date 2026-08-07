import { QuizQuestion, AssertionReasonQuestion, ShortQuestion, TopicQuizData } from "../types";
import { formatMathText, cleanTopicTitle } from "../utils/formatMathText";

export const STANDARD_AR_OPTIONS = [
  "A) Both Assertion (A) and Reason (R) are true, and Reason (R) is the correct explanation of Assertion (A).",
  "B) Both Assertion (A) and Reason (R) are true, but Reason (R) is NOT the correct explanation of Assertion (A).",
  "C) Assertion (A) is true, but Reason (R) is false.",
  "D) Assertion (A) is false, but Reason (R) is true."
];

export const TOPIC_QUIZZES: Record<string, TopicQuizData> = {
  // ==========================================
  // GRADE 6 MATHEMATICS: FRACTIONS
  // ==========================================
  fractions: {
    chapterId: "fractions",
    chapterTitle: "Fractions",
    mcqs: [
      {
        id: "frac_m1",
        question: "What fraction of a shape is shaded if it is divided into 8 equal parts and 3 parts are shaded?",
        options: ["A) 3/8", "B) 5/8", "C) 8/3", "D) 3/5"],
        correctAnswer: "A",
        hint: "The numerator is the number of shaded parts, and the denominator is the total equal parts.",
        explanation: "Fraction = Shaded Parts / Total Parts = 3/8."
      },
      {
        id: "frac_m2",
        question: "Which of the following is a proper fraction?",
        options: ["A) 3/5", "B) 7/4", "C) 5/5", "D) 9/2"],
        correctAnswer: "A",
        hint: "In a proper fraction, the numerator is strictly less than the denominator.",
        explanation: "3/5 has numerator 3 which is smaller than denominator 5, so it is a proper fraction."
      },
      {
        id: "frac_m3",
        question: "What is the improper fraction 11/4 expressed as a mixed fraction?",
        options: ["A) 2 ¾", "B) 2 ¼", "C) 3 ¼", "D) 1 ¾"],
        correctAnswer: "A",
        hint: "Divide 11 by 4: Quotient is 2, Remainder is 3.",
        explanation: "11 ÷ 4 = 2 with a remainder of 3, so 11/4 = 2 ¾."
      },
      {
        id: "frac_m4",
        question: "Which fraction is equivalent to 2/5?",
        options: ["A) 6/15", "B) 4/15", "C) 8/25", "D) 5/10"],
        correctAnswer: "A",
        hint: "Multiply numerator and denominator by the same integer.",
        explanation: "Multiply numerator and denominator of 2/5 by 3: (2×3)/(5×3) = 6/15."
      },
      {
        id: "frac_m5",
        question: "What is the simplest form (lowest terms) of 18/24?",
        options: ["A) 3/4", "B) 6/8", "C) 9/12", "D) 2/3"],
        correctAnswer: "A",
        hint: "Divide numerator and denominator by their Highest Common Factor (HCF = 6).",
        explanation: "18 ÷ 6 = 3, and 24 ÷ 6 = 4. So 18/24 in simplest form is 3/4."
      },
      {
        id: "frac_m6",
        question: "What is the sum of the like fractions: 3/10 + 4/10?",
        options: ["A) 7/10", "B) 7/20", "C) 1/10", "D) 12/10"],
        correctAnswer: "A",
        hint: "For like fractions, add the numerators and keep the same denominator.",
        explanation: "(3 + 4)/10 = 7/10."
      },
      {
        id: "frac_m7",
        question: "Subtract: 5/6 − 1/3.",
        options: ["A) 1/2", "B) 4/3", "C) 2/3", "D) 1/6"],
        correctAnswer: "A",
        hint: "Convert 1/3 to a like fraction with denominator 6: 1/3 = 2/6.",
        explanation: "5/6 − 2/6 = 3/6 = 1/2."
      },
      {
        id: "frac_m8",
        question: "Which relationship symbol makes 3/4 ___ 5/8 true?",
        options: ["A) >", "B) <", "C) =", "D) ≤"],
        correctAnswer: "A",
        hint: "Convert 3/4 to eighths: 3/4 = 6/8.",
        explanation: "Since 6/8 > 5/8, 3/4 > 5/8."
      },
      {
        id: "frac_m9",
        question: "Rahul ate 2/5 of a pizza and Seema ate 1/5 of the same pizza. What fraction of the pizza did they eat altogether?",
        options: ["A) 3/5", "B) 3/10", "C) 1/5", "D) 4/5"],
        correctAnswer: "A",
        hint: "Add the two fractions: 2/5 + 1/5.",
        explanation: "2/5 + 1/5 = 3/5 of the pizza."
      },
      {
        id: "frac_m10",
        question: "A jug contains 3/4 liter of juice. If 1/4 liter is poured out into a glass, how much juice remains in the jug?",
        options: ["A) 1/2 liter", "B) 1/4 liter", "C) 3/8 liter", "D) 1 liter"],
        correctAnswer: "A",
        hint: "Subtract 1/4 from 3/4.",
        explanation: "3/4 − 1/4 = 2/4 = 1/2 liter."
      },
      {
        id: "frac_m11",
        question: "Which of the following pairs of fractions are unlike fractions?",
        options: ["A) 2/7 and 5/9", "B) 3/8 and 5/8", "C) 1/5 and 4/5", "D) 7/12 and 11/12"],
        correctAnswer: "A",
        hint: "Unlike fractions have different denominators.",
        explanation: "2/7 and 5/9 have different denominators (7 and 9), so they are unlike fractions."
      },
      {
        id: "frac_m12",
        question: "What number replaces '?' to make 4/7 = ?/21 true?",
        options: ["A) 12", "B) 16", "C) 14", "D) 9"],
        correctAnswer: "A",
        hint: "21 is 7 × 3, so multiply the numerator 4 by 3.",
        explanation: "4 × 3 = 12. So 4/7 = 12/21."
      },
      {
        id: "frac_m13",
        question: "What is 1/2 of 24?",
        options: ["A) 12", "B) 10", "C) 14", "D) 48"],
        correctAnswer: "A",
        hint: "Divide 24 by 2.",
        explanation: "1/2 × 24 = 24 / 2 = 12."
      },
      {
        id: "frac_m14",
        question: "In the fraction 7/12, what does the number 12 represent?",
        options: ["A) Total number of equal parts into which the whole is divided", "B) Number of parts taken or shaded", "C) The quotient after dividing", "D) The remainder"],
        correctAnswer: "A",
        hint: "The denominator shows the total number of equal parts.",
        explanation: "The denominator (12) represents the total equal parts into which the whole is divided."
      },
      {
        id: "frac_m15",
        question: "If a string of length 5/2 meters is cut into 5 equal pieces, what is the length of each piece?",
        options: ["A) 1/2 meter", "B) 1 meter", "C) 2/5 meter", "D) 1/5 meter"],
        correctAnswer: "A",
        hint: "Divide 5/2 by 5.",
        explanation: "(5/2) ÷ 5 = (5/2) × (1/5) = 1/2 meter."
      }
    ],
    assertionReasons: [
      {
        id: "frac_ar1",
        assertion: "3/5 is a proper fraction.",
        reason: "In a proper fraction, the numerator is always less than the denominator.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        hint: "Check whether numerator 3 < denominator 5.",
        explanation: "Both statements are true and Reason (R) correctly explains why 3/5 is a proper fraction."
      },
      {
        id: "frac_ar2",
        assertion: "4/6 and 6/9 are equivalent fractions.",
        reason: "Multiplying or dividing both the numerator and denominator of a fraction by the same non-zero number yields an equivalent fraction.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        hint: "Simplify 4/6 and 6/9 to simplest form.",
        explanation: "4/6 reduces to 2/3 and 6/9 reduces to 2/3. They are equivalent and R is the correct explanation."
      },
      {
        id: "frac_ar3",
        assertion: "To add 1/4 and 1/3, we can directly add the numerators to get 2/7.",
        reason: "Fractions with different denominators (unlike fractions) must first be converted into like fractions with a common denominator before adding.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        hint: "You cannot add numerators directly when denominators differ.",
        explanation: "Assertion (A) is false because 1/4 + 1/3 = 3/12 + 4/12 = 7/12 (not 2/7). Reason (R) is true."
      },
      {
        id: "frac_ar4",
        assertion: "7/3 is an improper fraction.",
        reason: "An improper fraction is a fraction in which the numerator is greater than or equal to the denominator.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        hint: "Compare numerator 7 and denominator 3.",
        explanation: "7 > 3, so 7/3 is an improper fraction, and R gives the correct definition."
      },
      {
        id: "frac_ar5",
        assertion: "The mixed fraction 2 ⅓ is equal to the improper fraction 7/3.",
        reason: "A mixed fraction can be converted to an improper fraction using the formula: (Whole Number × Denominator + Numerator) / Denominator.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        hint: "(2 × 3 + 1) / 3 = 7/3.",
        explanation: "2 × 3 + 1 = 7, so 2 ⅓ = 7/3, and R explains the exact rule."
      },
      {
        id: "frac_ar6",
        assertion: "5/8 is greater than 3/8.",
        reason: "When comparing two like fractions, the fraction with the larger numerator is greater.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        hint: "Both have denominator 8, compare 5 and 3.",
        explanation: "Since denominators are equal (like fractions), 5 > 3 implies 5/8 > 3/8."
      },
      {
        id: "frac_ar7",
        assertion: "The fraction 12/15 is in its simplest form.",
        reason: "A fraction is in its simplest form if its numerator and denominator have no common factor other than 1.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        hint: "12 and 15 share 3 as a common factor.",
        explanation: "Assertion (A) is false because 12/15 = 4/5 when divided by 3. Reason (R) is true."
      },
      {
        id: "frac_ar8",
        assertion: "1/2 of 20 is equal to 10.",
        reason: "Finding a fraction of a whole number is equivalent to multiplying the whole number by that fraction.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        hint: "1/2 × 20 = 10.",
        explanation: "Both statement and reason are true, and R correctly explains the operation."
      }
    ]
  },
  // ==========================================
  // PHYSICS CHAPTERS (GRADE 6 & GRADE 9)
  // ==========================================
  g6_phys_motion: {
    chapterId: "g6_phys_motion",
    chapterTitle: "Motion and Measurement of Distances",
    mcqs: [
      {
        id: "m1",
        question: "Which unit is accepted worldwide as the International System of Units (SI unit) of length?",
        options: ["A) Centimeter (cm)", "B) Meter (m)", "C) Kilometer (km)", "D) Foot (ft)"],
        correctAnswer: "B",
        hint: "The SI unit of length forms the base for scientific calculations globally.",
        explanation: "The meter (m) is the standard SI unit of length used worldwide."
      },
      {
        id: "m2",
        question: "What type of motion is exhibited by the pendulum of a clock?",
        options: ["A) Rectilinear motion", "B) Circular motion", "C) Periodic motion", "D) Rotational motion"],
        correctAnswer: "C",
        hint: "It repeats its motion to and fro at regular intervals of time.",
        explanation: "Motion that repeats itself after equal intervals of time is called periodic motion."
      },
      {
        id: "m3",
        question: "A moving wheel of a bicycle demonstrates which combination of motions?",
        options: ["A) Rectilinear and Rotational motion", "B) Periodic and Oscillatory motion", "C) Only Circular motion", "D) Random and Vibrational motion"],
        correctAnswer: "A",
        hint: "The wheel rotates around its axle while moving straight along the ground.",
        explanation: "As the bicycle travels in a straight line (rectilinear), its wheel rotates continuously about its axis (rotational)."
      },
      {
        id: "m4",
        question: "1 kilometer is equal to how many meters?",
        options: ["A) 100 meters", "B) 1,000 meters", "C) 10,000 meters", "D) 10 meters"],
        correctAnswer: "B",
        hint: "Kilo- is a prefix meaning one thousand.",
        explanation: "1 km = 1,000 meters; 1 meter = 100 centimeters."
      },
      {
        id: "m5",
        question: "Why should hand-span or cubit NOT be used as a standard unit of measurement?",
        options: ["A) Because hands are too small", "B) Because body sizes vary from person to person", "C) Because cubits are difficult to measure", "D) Because ruler scales are cheap"],
        correctAnswer: "B",
        hint: "Standard units must remain constant regardless of who is measuring.",
        explanation: "Body parts differ in length across people, leading to inconsistent measurements."
      },
      {
        id: "m6",
        question: "What tool should be used to measure the length of a curved line accurately?",
        options: ["A) A rigid wooden meter scale", "B) A thread and a standard ruler", "C) A measuring tape alone", "D) A handspan"],
        correctAnswer: "B",
        hint: "Place a flexible thread along the curve, mark start and end points, then measure the stretched thread on a ruler.",
        explanation: "A thread can flex along any curved boundary; stretching it along a straight ruler gives the exact curve length."
      },
      {
        id: "m7",
        question: "While taking a measurement using a ruler, where should your eye be positioned?",
        options: ["A) Slightly to the left of the reading point", "B) Directly above the point being measured", "C) Slightly to the right of the reading point", "D) At any comfortable angle"],
        correctAnswer: "B",
        hint: "Looking from an angle causes parallax error.",
        explanation: "To prevent parallax error, your eye must be positioned vertically directly above the measurement point."
      },
      {
        id: "m8",
        question: "What is the correct conversion of 25 millimeters (mm) into centimeters (cm)?",
        options: ["A) 250 cm", "B) 2.5 cm", "C) 0.25 cm", "D) 25 cm"],
        correctAnswer: "B",
        hint: "1 cm = 10 mm. Divide millimeters by 10.",
        explanation: "25 mm ÷ 10 = 2.5 cm."
      },
      {
        id: "m9",
        question: "Which of the following exhibits periodic motion?",
        options: ["A) A car moving at constant speed on a straight highway", "B) Plucked string of a sitar or guitar", "C) A ball rolling down a slope", "D) A spinning top"],
        correctAnswer: "B",
        hint: "Periodic motion repeats itself back and forth at regular time intervals.",
        explanation: "A plucked musical string vibrates back and forth at fixed time intervals, exhibiting periodic oscillatory motion."
      },
      {
        id: "m10",
        question: "When measuring with a broken ruler whose zero mark is not visible, if you start at 2.0 cm and read 14.5 cm at the end, what is the actual length?",
        options: ["A) 14.5 cm", "B) 16.5 cm", "C) 12.5 cm", "D) 10.5 cm"],
        correctAnswer: "C",
        hint: "Actual length = End reading - Starting mark.",
        explanation: "14.5 cm - 2.0 cm = 12.5 cm."
      },
      {
        id: "m11",
        question: "An athlete runs 4 complete laps around a 400-meter circular track and finishes at the exact starting point. What is the total distance covered and net displacement?",
        options: ["A) Distance = 1600 m, Displacement = 0 m", "B) Distance = 0 m, Displacement = 1600 m", "C) Distance = 1600 m, Displacement = 1600 m", "D) Distance = 400 m, Displacement = 400 m"],
        correctAnswer: "A",
        hint: "Displacement is the shortest straight-line distance between initial and final position.",
        explanation: "Since the athlete returns to the exact starting line, final position = initial position, making displacement = 0 m. Total distance = 4 × 400 = 1600 m."
      },
      {
        id: "m12",
        question: "A car travels 60 km due North, then turns and travels 80 km due East. What is the magnitude of its net displacement from the starting point?",
        options: ["A) 140 km", "B) 100 km", "C) 20 km", "D) 70 km"],
        correctAnswer: "B",
        hint: "Use the Pythagorean theorem (Hypotenuse² = North² + East²).",
        explanation: "Displacement = √(60² + 80²) = √(3600 + 6400) = √10000 = 100 km."
      },
      {
        id: "m13",
        question: "Which of the following graphs represents a body at REST (zero velocity) on a Distance-Time (d-t) graph?",
        options: ["A) A straight line sloped upwards passing through origin", "B) A horizontal straight line parallel to the Time axis", "C) A curved line curving upwards", "D) A vertical straight line parallel to the Distance axis"],
        correctAnswer: "B",
        hint: "Distance remains constant as time increases.",
        explanation: "A horizontal straight line parallel to time axis indicates that distance is not changing with time, meaning the body is stationary."
      },
      {
        id: "m14",
        question: "Which of the following physical units is NOT a valid unit of speed?",
        options: ["A) m/s", "B) km/h", "C) cm/s", "D) kg/m³"],
        correctAnswer: "D",
        hint: "Speed = Distance ÷ Time. kg/m³ is a unit of density.",
        explanation: "kg/m³ is the SI unit of density (Mass/Volume), not speed."
      },
      {
        id: "m15",
        question: "An insect moves along a circular wire of radius R = 7 cm. What is the ratio of distance traveled to displacement when it completes HALF a circle (π = 22/7)?",
        options: ["A) 11 : 7", "B) 22 : 7", "C) 7 : 11", "D) 1 : 1"],
        correctAnswer: "A",
        hint: "Half circle distance = π × R; Half circle displacement = 2 × R.",
        explanation: "Distance = (22/7) × 7 = 22 cm. Displacement = 2 × 7 = 14 cm. Ratio = 22 : 14 = 11 : 7."
      },
      {
        id: "m16",
        question: "What is the equivalent speed of 72 km/h when converted into meters per second (m/s)?",
        options: ["A) 10 m/s", "B) 20 m/s", "C) 30 m/s", "D) 25 m/s"],
        correctAnswer: "B",
        hint: "Multiply km/h by 5/18 to convert to m/s.",
        explanation: "72 × (5/18) = 4 × 5 = 20 m/s."
      },
      {
        id: "m17",
        question: "A train 150 meters long crosses a stationary electric pole in 15 seconds. What is the speed of the train?",
        options: ["A) 10 m/s", "B) 15 m/s", "C) 5 m/s", "D) 20 m/s"],
        correctAnswer: "A",
        hint: "Speed = Distance (length of train) ÷ Time.",
        explanation: "Speed = 150 m ÷ 15 s = 10 m/s (36 km/h)."
      },
      {
        id: "m18",
        question: "What type of motion is exhibited by the tip of the second hand of a clock as it sweeps across the circular dial?",
        options: ["A) Uniform circular motion with changing direction", "B) Rectilinear motion", "C) Non-periodic motion", "D) Random motion"],
        correctAnswer: "A",
        hint: "Its speed is constant, but its direction of movement continuously changes along the circle.",
        explanation: "The tip moves along a circular path at constant speed, repeating every 60 seconds (uniform circular periodic motion)."
      },
      {
        id: "m19",
        question: "The slope (gradient) of a Distance-Time graph represents which physical quantity?",
        options: ["A) Acceleration", "B) Speed / Velocity", "C) Total Distance", "D) Force"],
        correctAnswer: "B",
        hint: "Slope = Vertical change (Distance) ÷ Horizontal change (Time).",
        explanation: "Slope = ΔDistance / ΔTime = Speed."
      },
      {
        id: "m20",
        question: "An object covers the first 20 meters in 4 seconds and the next 20 meters in 6 seconds. What is its AVERAGE speed?",
        options: ["A) 4.0 m/s", "B) 5.0 m/s", "C) 4.5 m/s", "D) 3.5 m/s"],
        correctAnswer: "A",
        hint: "Average Speed = Total Distance ÷ Total Time.",
        explanation: "Total Distance = 20 + 20 = 40 m. Total Time = 4 + 6 = 10 s. Average Speed = 40 ÷ 10 = 4.0 m/s."
      },
      {
        id: "m21",
        question: "Which measuring instrument inside an automobile records the total cumulative distance traveled by the vehicle?",
        options: ["A) Speedometer", "B) Odometer", "C) Tachometer", "D) Thermometer"],
        correctAnswer: "B",
        hint: "Speedometer measures instantaneous speed; Odometer records total kilometers driven.",
        explanation: "An odometer measures and displays the total distance traveled by a motor vehicle."
      },
      {
        id: "m22",
        question: "A stone tied to a string is whirled in a horizontal circle at constant speed. If the string suddenly snaps, in which direction will the stone fly off?",
        options: ["A) Towards the center of the circle", "B) Directly away from the center (radially outwards)", "C) Tangentially along a straight line at that instant", "D) It stops immediately and drops vertically down"],
        correctAnswer: "C",
        hint: "At any point on a circle, the velocity vector points along the tangent.",
        explanation: "When the string breaks, centripetal force ceases and inertia causes the stone to fly off tangentially."
      },
      {
        id: "m23",
        question: "Which of the following physical quantities requires BOTH magnitude and direction for its complete specification (Vector Quantity)?",
        options: ["A) Speed", "B) Distance", "C) Mass", "D) Displacement"],
        correctAnswer: "D",
        hint: "Displacement includes distance as well as direction relative to the starting point.",
        explanation: "Displacement is a vector quantity (magnitude + direction), whereas distance, speed, and mass are scalar quantities."
      },
      {
        id: "m24",
        question: "A car travels at 40 km/h for the first hour and 60 km/h for the second hour. What is the average speed of the car for the entire 2-hour journey?",
        options: ["A) 48 km/h", "B) 50 km/h", "C) 52 km/h", "D) 55 km/h"],
        correctAnswer: "B",
        hint: "d1 = 40 km, d2 = 60 km. Total distance = 100 km in 2 hours.",
        explanation: "Total Distance = 40 + 60 = 100 km. Total Time = 2 hours. Average Speed = 100 ÷ 2 = 50 km/h."
      },
      {
        id: "m25",
        question: "What is the correct arrangement of metric unit prefixes for length in order from SMALLEST to LARGEST?",
        options: ["A) Meter < Centimeter < Millimeter < Kilometer", "B) Millimeter < Centimeter < Meter < Kilometer", "C) Centimeter < Millimeter < Kilometer < Meter", "D) Kilometer < Meter < Centimeter < Millimeter"],
        correctAnswer: "B",
        hint: "1 mm = 0.001 m, 1 cm = 0.01 m, 1 m, 1 km = 1000 m.",
        explanation: "Millimeter (mm) < Centimeter (cm) < Meter (m) < Kilometer (km)."
      },
      {
        id: "m26",
        question: "To convert a speed value given in kilometers per hour (km/h) into meters per second (m/s), you must multiply by:",
        options: ["A) 18/5", "B) 5/18", "C) 10/360", "D) 3.6"],
        correctAnswer: "B",
        hint: "1 km/h = (1000 m) / (3600 s) = 10/36 = 5/18 m/s.",
        explanation: "Since 1 km = 1000 m and 1 hour = 3600 s, 1 km/h = 1000/3600 = 5/18 m/s. So multiply by 5/18."
      },
      {
        id: "m27",
        question: "A train is traveling at a speed of 108 km/h. What is its speed in meters per second (m/s)?",
        options: ["A) 20 m/s", "B) 25 m/s", "C) 30 m/s", "D) 35 m/s"],
        correctAnswer: "C",
        hint: "108 × (5 / 18) = ?",
        explanation: "Speed in m/s = 108 × (5 / 18) = 6 × 5 = 30 m/s."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): The motion of the blades of an electric fan is circular motion.",
        reason: "Reason (R): The blades rotate around a fixed center point, keeping a constant distance from the axis.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true. Fan blades rotate around a central point maintaining equal radial distance, which defines circular rotational motion."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Standard units of measurement are necessary for accurate trade and communication.",
        reason: "Reason (R): Non-standard units like cubit and hand-span give different values for different persons.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why standard units like meter are essential to eliminate personal measurement variations."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): A stone falling from a cliff exhibits periodic motion.",
        reason: "Reason (R): Periodic motion repeats itself after equal intervals of time.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because a falling stone exhibits rectilinear (straight line) accelerated motion, not periodic motion. Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): 150 cm is equal to 1.5 meters.",
        reason: "Reason (R): 1 meter contains 100 centimeters.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true. Dividing 150 cm by 100 cm/m gives 1.5 m."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Motion of a marching soldier on a straight road is rectilinear motion.",
        reason: "Reason (R): Motion along a straight line path is called rectilinear motion.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true and Reason (R) is the exact definition of rectilinear motion."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Parallax error occurs if the eye is not placed vertically above the mark while taking a scale reading.",
        reason: "Reason (R): Viewing a mark from an oblique angle shifts the apparent position of the scale mark relative to the object.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains the cause of parallax error."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): A thread can be used to measure the length of a curved river on a map.",
        reason: "Reason (R): A thread can bend along any irregular curved line, and its length can then be measured on a straight ruler scale.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains why thread is effective for measuring curved paths."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): The earth rotating on its axis exhibits periodic as well as rotational motion.",
        reason: "Reason (R): Earth completes one full rotation on its axis in exactly 24 hours, repeating continuously.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why Earth's spinning is both rotational (spinning on axis) and periodic (repeating every 24 hours)."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): 1 meter is equal to 1000 centimeters.",
        reason: "Reason (R): Multiples and sub-multiples in the SI system are based on powers of 10.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE because 1 meter = 100 cm (not 1000 cm). Reason (R) is TRUE."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): Motion of a child on a swing is an example of periodic motion.",
        reason: "Reason (R): The child moves to and fro about a central resting position at regular time intervals.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) describes the exact characteristic of periodic oscillatory motion."
      },
      {
        id: "ar11",
        assertion: "Assertion (A): Displacement of a body can be zero even if the total distance traveled is non-zero.",
        reason: "Reason (R): Displacement measures the shortest straight-line distance between initial and final positions of a body.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why returning to the starting point results in zero displacement."
      },
      {
        id: "ar12",
        assertion: "Assertion (A): The motion of a spinning potter's wheel is rotational motion.",
        reason: "Reason (R): In rotational motion, all points on the body move in circular paths around a fixed central axis.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the exact definition of rotational motion."
      },
      {
        id: "ar13",
        assertion: "Assertion (A): To convert speed from km/h to m/s, we multiply the given value by 5/18.",
        reason: "Reason (R): 1 kilometer = 1000 meters and 1 hour = 3600 seconds, so 1000/3600 simplifies to 5/18.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) mathematically proves the unit conversion factor 5/18."
      },
      {
        id: "ar14",
        assertion: "Assertion (A): The slope of a Distance-Time graph parallel to the time axis is zero.",
        reason: "Reason (R): Zero slope on a Distance-Time graph signifies that the object is stationary at rest.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly interprets the physical meaning of zero slope."
      },
      {
        id: "ar15",
        assertion: "Assertion (A): The revolution of Earth around the Sun is both periodic and circular/elliptical motion.",
        reason: "Reason (R): Earth repeats its orbital trajectory around the Sun once every 365.25 days.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why planetary revolution is periodic."
      },
      {
        id: "ar16",
        assertion: "Assertion (A): Speed is a scalar quantity while displacement is a vector quantity.",
        reason: "Reason (R): Scalar quantities require both magnitude and direction for their complete specification.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "C",
        explanation: "Assertion (A) is TRUE. Reason (R) is FALSE because scalar quantities require ONLY magnitude, not direction."
      },
      {
        id: "ar17",
        assertion: "Assertion (A): An odometer in an automobile measures the instantaneous speed of the vehicle.",
        reason: "Reason (R): A speedometer measures the total distance covered by a vehicle in kilometers.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (odometer measures distance). Reason (R) is FALSE (speedometer measures speed)."
      },
      {
        id: "ar18",
        assertion: "Assertion (A): Light travels vastly faster than sound in air.",
        reason: "Reason (R): Flash of lightning during a thunderstorm is seen before thunder sound is heard.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) provides the everyday observational evidence of light speed exceeding sound speed."
      },
      {
        id: "ar19",
        assertion: "Assertion (A): A curved line on a Distance-Time graph indicates non-uniform speed.",
        reason: "Reason (R): Non-uniform speed implies covering unequal distances in equal intervals of time.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why a curved slope corresponds to non-uniform speed."
      },
      {
        id: "ar20",
        assertion: "Assertion (A): All oscillatory motions are periodic, but not all periodic motions are oscillatory.",
        reason: "Reason (R): Earth's revolution around the Sun repeats at fixed intervals, but does not move to-and-fro about a central mean position.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) provides a clear counterexample proving why revolution is periodic but not oscillatory."
      },
      {
        id: "ar21",
        assertion: "Assertion (A): A ruler scale broken at the zero mark cannot be used for measuring length accurately.",
        reason: "Reason (R): Length measurements can still be made accurately by starting from any intact centimeter mark and subtracting that mark from the final reading.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (broken scale can still be used). Reason (R) is TRUE."
      },
      {
        id: "ar22",
        assertion: "Assertion (A): Parallax error is completely eliminated when looking at a measuring scale from an oblique angle.",
        reason: "Reason (R): Parallax error occurs when the eye is not positioned vertically directly above the measurement mark.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (oblique viewing CAUSES parallax error). Reason (R) is TRUE."
      },
      {
        id: "ar23",
        assertion: "Assertion (A): The motion of a drill bit drilling into a block of wood is a combination of rotational and rectilinear motion.",
        reason: "Reason (R): The drill bit spins rapidly on its central axis while simultaneously advancing forward straight into the wood.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains the combination of spinning and translational advancement."
      },
      {
        id: "ar24",
        assertion: "Assertion (A): International System of Units (SI) is universally adopted in modern scientific work.",
        reason: "Reason (R): SI units eliminate measurement discrepancies caused by varying personal body units like cubit or handspan.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains why standardized SI units were established globally."
      },
      {
        id: "ar25",
        assertion: "Assertion (A): The Distance-Time graph of an object moving with uniform speed is a straight line passing through the origin.",
        reason: "Reason (R): In uniform speed, distance covered is directly proportional to the time elapsed.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why linear proportionality produces a straight line graph."
      }
    ]
  },

  g6_phys_light: {
    chapterId: "g6_phys_light",
    chapterTitle: "Light, Shadows and Reflections",
    mcqs: [
      {
        id: "m1",
        question: "Which type of material allows light to pass through it completely, making objects clearly visible?",
        options: ["A) Opaque", "B) Translucent", "C) Transparent", "D) Reflective"],
        correctAnswer: "C",
        hint: "Clear glass and clean water are examples of this material.",
        explanation: "Transparent materials allow light to pass through them completely."
      },
      {
        id: "m2",
        question: "A shadow is formed when light is obstructed by which kind of object?",
        options: ["A) Transparent object", "B) Opaque object", "C) Luminous object", "D) Vacuum"],
        correctAnswer: "B",
        hint: "Objects that block light completely cast dark shadows.",
        explanation: "An opaque object blocks light from passing through, creating a shadow on the screen behind it."
      },
      {
        id: "m3",
        question: "What property of light is demonstrated by a pinhole camera?",
        options: ["A) Light bends around corners", "B) Light travels in a straight line", "C) Light splits into 7 colors", "D) Light travels in circles"],
        correctAnswer: "B",
        hint: "Rectilinear propagation causes rays to cross in a small aperture, forming an inverted image.",
        explanation: "Light travels along straight paths (rectilinear propagation), producing upside-down images in pinhole cameras."
      },
      {
        id: "m4",
        question: "Which of the following is a non-luminous object?",
        options: ["A) Sun", "B) Glowing electric bulb", "C) Moon", "D) Firefly"],
        correctAnswer: "C",
        hint: "This celestial body reflects sunlight and does not emit its own light.",
        explanation: "The Moon does not produce its own light; it reflects light from the Sun."
      },
      {
        id: "m5",
        question: "What happens to the size of a shadow when an opaque object is brought closer to the light source?",
        options: ["A) The shadow becomes smaller", "B) The shadow becomes larger", "C) The shadow vanishes", "D) The shadow changes color"],
        correctAnswer: "B",
        hint: "Bringing an object closer blocks a wider cone of light rays.",
        explanation: "Moving the object closer to the light source obstructs a larger area of light, enlarging the projected shadow."
      },
      {
        id: "m6",
        question: "Which of the following materials is translucent?",
        options: ["A) Clear glass plate", "B) Butter paper / tracing paper", "C) Thick wooden plank", "D) Iron sheet"],
        correctAnswer: "B",
        hint: "Translucent materials allow light to pass partially, making objects appear blurred.",
        explanation: "Butter paper allows light to pass through only partially, making it a translucent material."
      },
      {
        id: "m7",
        question: "Which of the following three components are strictly essential to observe a shadow?",
        options: ["A) Light source, opaque object, and a screen", "B) Light source, mirror, and lens", "C) Transparent sheet, prism, and water", "D) Mirror, shadow box, and glass"],
        correctAnswer: "A",
        hint: "You need something that emits light, something that blocks light, and a surface for the shadow to fall on.",
        explanation: "A shadow requires a source of light, an opaque object to block the light, and a screen (or wall/ground) where the shadow drops."
      },
      {
        id: "m8",
        question: "The phenomenon of bouncing back of light rays when they strike a smooth polished surface like a mirror is called:",
        options: ["A) Refraction", "B) Reflection", "C) Dispersion", "D) Absorption"],
        correctAnswer: "B",
        hint: "Mirrors reflect light rays to form images.",
        explanation: "Reflection is the bouncing back of light when it strikes a reflective surface like a plane mirror."
      },
      {
        id: "m9",
        question: "An image formed by a plane mirror is:",
        options: ["A) Real, inverted, and enlarged", "B) Virtual, upright, same size, and laterally inverted", "C) Real and upside down", "D) Formed directly on the mirror surface"],
        correctAnswer: "B",
        hint: "Your reflection in a bathroom mirror is upright, same size, but left and right sides are interchanged.",
        explanation: "Images in plane mirrors are virtual, erect, equal in size to the object, and laterally inverted."
      },
      {
        id: "m10",
        question: "Why can we see non-luminous objects around us during the daytime?",
        options: ["A) Because they produce their own glowing light", "B) Because they reflect sunlight falling on them into our eyes", "C) Because atmospheric air glows naturally", "D) Because shadows emit light"],
        correctAnswer: "B",
        hint: "Non-luminous objects bounce incoming light from the Sun into our eyes.",
        explanation: "We see non-luminous objects when light from a luminous source (like the Sun) reflects off their surface into our eyes."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Shadows are always dark regardless of the color of the object.",
        reason: "Reason (R): A shadow is formed due to the absence of light in the region blocked by an opaque body.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true. Shadows represent regions where light is blocked, so they do not show the object's color."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Images formed by a plane mirror show lateral inversion.",
        reason: "Reason (R): In a plane mirror, the left side of the object appears as the right side of the image.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true. Lateral inversion is the sideways reversal of an image in a plane mirror."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Transparent objects cast thick dark shadows on a white wall.",
        reason: "Reason (R): Transparent materials allow almost all light rays to pass through without obstruction.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because transparent objects let light pass through and do not form distinct shadows. Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Light travels in straight lines in a uniform medium.",
        reason: "Reason (R): Pinhole camera images are erect and upright.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "C",
        explanation: "Assertion is TRUE. Reason is FALSE because pinhole camera images are inverted (upside down)."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): The Moon is classified as a luminous celestial object.",
        reason: "Reason (R): Luminous objects emit their own light.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because the Moon is non-luminous (reflects sunlight). Reason is TRUE."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): An image formed by a pinhole camera is upside down (inverted).",
        reason: "Reason (R): Light rays traveling from the top and bottom of an object cross each other as they pass through the tiny aperture in straight lines.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why rectilinear propagation creates inverted pinhole camera images."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): Opaque objects do not allow any light to pass through them.",
        reason: "Reason (R): Wood, metals, and cardboard are classic examples of opaque materials.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives valid examples of opaque materials that completely block light."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): An image and a shadow are identical in all visual properties.",
        reason: "Reason (R): An image shows true color, texture, and detail of an object, whereas a shadow is merely a dark patch showing only outer outline.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (images show full color/detail while shadows are dark outlines). Reason (R) is TRUE."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): The word 'AMBULANCE' is written in reversed lettering on the front of emergency vehicles.",
        reason: "Reason (R): Lateral inversion in the rearview mirrors of drivers ahead makes the text appear correctly oriented.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains why lateral inversion is intentionally utilized on emergency vehicles."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): Eclipses are natural phenomena caused by shadow formation in space.",
        reason: "Reason (R): When the Sun, Earth, and Moon align in a straight line, opaque Earth or Moon blocks sunlight and casts a shadow on the other.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) provides the scientific cause of solar and lunar eclipses."
      }
    ]
  },

  g6_phys_electricity: {
    chapterId: "g6_phys_electricity",
    chapterTitle: "Electricity and Circuits",
    mcqs: [
      {
        id: "m1",
        question: "What is the primary function of an electric switch in a circuit?",
        options: ["A) To generate electricity", "B) To open or close an electric circuit", "C) To increase voltage", "D) To convert current into heat"],
        correctAnswer: "B",
        hint: "It acts as a bridge that can break or complete the electrical path.",
        explanation: "A switch breaks (opens) or completes (closes) the conductive path of an electric circuit."
      },
      {
        id: "m2",
        question: "Which of the following materials is a good conductor of electricity?",
        options: ["A) Rubber", "B) Plastic", "C) Copper wire", "D) Dry wood"],
        correctAnswer: "C",
        hint: "Metals allow electric current to pass through easily.",
        explanation: "Copper is a metal with low electrical resistance, making it an excellent conductor."
      },
      {
        id: "m3",
        question: "An electric cell converts which form of energy into electrical energy?",
        options: ["A) Solar energy", "B) Chemical energy", "C) Mechanical energy", "D) Sound energy"],
        correctAnswer: "B",
        hint: "Chemicals stored inside the dry cell react to produce current.",
        explanation: "An electric cell stores chemical energy and converts it into electrical energy when connected in a closed circuit."
      },
      {
        id: "m4",
        question: "In an electric cell, electric current flows outside the cell from:",
        options: ["A) Positive (+) terminal to Negative (-) terminal", "B) Negative (-) terminal to Positive (+) terminal", "C) Middle to outer shell", "D) Both directions simultaneously"],
        correctAnswer: "A",
        hint: "Conventional current direction is defined from positive to negative.",
        explanation: "Electric current flows from the positive terminal to the negative terminal through the external circuit."
      },
      {
        id: "m5",
        question: "Why are electrical wires covered with plastic or rubber coatings?",
        options: ["A) To make them look colorful", "B) Because plastic/rubber are insulators that protect against electric shocks", "C) To make wires heavier", "D) To generate more current"],
        correctAnswer: "B",
        hint: "Insulators do not allow current to pass, preventing accidental electrocution.",
        explanation: "Plastic and rubber are electrical insulators, insulating live conductors to keep users safe."
      },
      {
        id: "m6",
        question: "Which metal is used to make the thin glowing filament inside a traditional incandescent bulb?",
        options: ["A) Copper wire", "B) Tungsten metal", "C) Aluminum strip", "D) Silver thread"],
        correctAnswer: "B",
        hint: "This metal has an extremely high melting point and glows brightly when heated by electric current.",
        explanation: "Tungsten is used for bulb filaments because of its very high melting point and resistance."
      },
      {
        id: "m7",
        question: "An electric circuit in which the conducting path is broken or interrupted is called an:",
        options: ["A) Closed circuit", "B) Open circuit", "C) Short circuit", "D) Parallel circuit"],
        correctAnswer: "B",
        hint: "When a switch is in the OFF position, the circuit becomes incomplete.",
        explanation: "An open circuit has a gap in its conducting loop, preventing electric current from flowing."
      },
      {
        id: "m8",
        question: "Which of the following items is an electrical INSULATOR?",
        options: ["A) Aluminum foil", "B) Iron nail", "C) Dry eraser rubber", "D) Graphite pencil core"],
        correctAnswer: "C",
        hint: "Materials that do not allow electric current to pass through them are insulators.",
        explanation: "Dry rubber does not conduct electricity, making it an insulator."
      },
      {
        id: "m9",
        question: "What happens if two electric cells are connected positive terminal (+) to positive terminal (+) in a torch light?",
        options: ["A) The bulb glows brighter than usual", "B) The bulb will NOT glow because cells are improperly connected", "C) The cells charge instantly", "D) The bulb burns out immediately"],
        correctAnswer: "B",
        hint: "To flow current continuously, the positive terminal of one cell must connect to the negative terminal of the next.",
        explanation: "Connecting positive to positive opposes current flow, so the circuit fails to operate and the bulb does not light up."
      },
      {
        id: "m10",
        question: "Which part of a standard dry cell serves as its negative (-) terminal?",
        options: ["A) The central carbon rod cap", "B) The outer flat zinc base container", "C) The top brass button", "D) The plastic outer sleeve"],
        correctAnswer: "B",
        hint: "The bottom flat metallic disc made of zinc acts as the negative terminal.",
        explanation: "In a standard dry cell, the flat zinc casing at the bottom serves as the negative (-) terminal, while the metal cap on top is positive (+)."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): An electric bulb glows only when electric current flows through a closed circuit.",
        reason: "Reason (R): A closed circuit provides a continuous unbroken path for current to pass from one terminal to another.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why a complete closed circuit is required for a bulb to glow."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Human body is a conductor of electricity.",
        reason: "Reason (R): We should handle electric appliances with wet hands carefully or wear rubber footwear.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true. Water and dissolved ions in our body conduct electricity, making safety precautions essential."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Rubber bands and wooden handles are good conductors of electricity.",
        reason: "Reason (R): Materials that do not allow electric current to pass through them are called insulators.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because rubber and wood are insulators. Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): If the filament of an electric bulb breaks, the bulb becomes fused and will not glow.",
        reason: "Reason (R): A broken filament breaks the circuit path, stopping current flow through the bulb.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true and Reason (R) accurately explains why a fused bulb fails to light up."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): An electric cell has only one terminal.",
        reason: "Reason (R): An electric cell has a positive metal cap terminal and a negative flat metal base terminal.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE (cells have TWO terminals). Reason is TRUE."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Pencil lead (graphite) allows electric current to pass through it.",
        reason: "Reason (R): Graphite is a non-metallic crystalline form of carbon that conducts electricity.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why pencil lead is a good conductor."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): An electric cell produces electricity until the chemicals inside it are exhausted.",
        reason: "Reason (R): Chemical reactions inside the cell maintain an electric potential difference across its positive and negative terminals.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) provides the exact electrochemical mechanism of a dry cell."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): Electricians wear rubber gloves and rubber-soled footwear while repairing electric lines.",
        reason: "Reason (R): Rubber is an electrical insulator that prevents dangerous electric current from flowing through the human body.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why rubber gear provides effective safety insulation."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): Pure air under normal room conditions is a good conductor of electricity.",
        reason: "Reason (R): If air were a good conductor, electric current from wall sockets would spark through open air and cause electric shocks.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (air is a poor conductor/insulator under normal conditions). Reason (R) is TRUE."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): Connecting both terminals of an electric cell directly with a bare metal wire causes the cell to drain rapidly.",
        reason: "Reason (R): A direct connection creates a short circuit with very low resistance, leading to rapid chemical discharge.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why short-circuiting a cell depletes its energy rapidly."
      }
    ]
  },

  g6_phys_magnets: {
    chapterId: "g6_phys_magnets",
    chapterTitle: "Fun with Magnets",
    mcqs: [
      {
        id: "m1",
        question: "What happens when the North pole of one bar magnet is brought near the North pole of another bar magnet?",
        options: ["A) They attract each other", "B) They repel each other", "C) They rotate continuously", "D) Nothing happens"],
        correctAnswer: "B",
        hint: "Remember the fundamental law of magnetic poles: Like poles repel, unlike poles attract.",
        explanation: "Like magnetic poles (N-N or S-S) repel each other."
      },
      {
        id: "m2",
        question: "Which of the following is a magnetic material?",
        options: ["A) Wooden block", "B) Plastic spoon", "C) Iron nail", "D) Gold ring"],
        correctAnswer: "C",
        hint: "Items containing iron, nickel, or cobalt are attracted by magnets.",
        explanation: "Iron is a ferromagnetic material strongly attracted by magnets."
      },
      {
        id: "m3",
        question: "When a bar magnet is freely suspended horizontally, in which direction does it come to rest?",
        options: ["A) East - West direction", "B) North - South direction", "C) North - East direction", "D) Random direction"],
        correctAnswer: "B",
        hint: "Earth acts as a giant magnet whose magnetic poles align suspended bar magnets.",
        explanation: "A freely suspended magnet always aligns along the geographical North-South direction."
      },
      {
        id: "m4",
        question: "Where is the magnetic strength of a bar magnet concentrated maximum?",
        options: ["A) At the exact middle center", "B) At both of its poles (ends)", "C) Equally distributed everywhere", "D) Outside the magnet surface"],
        correctAnswer: "B",
        hint: "Iron filings stick most heavily at the two ends of a bar magnet.",
        explanation: "Magnetic force field lines are most dense at the North and South poles of a bar magnet."
      },
      {
        id: "m5",
        question: "What instrument used by sailors and navigators contains a magnetized needle pointing North-South?",
        options: ["A) Barometer", "B) Magnetic Compass", "C) Thermometer", "D) Speedometer"],
        correctAnswer: "B",
        hint: "It helps find geographic directions on land and sea.",
        explanation: "A magnetic compass contains a pivoted magnetic needle that settles in the N-S direction."
      },
      {
        id: "m6",
        question: "Which of the following is a NATURAL magnet discovered in ancient times?",
        options: ["A) Bar magnet", "B) Lodestone (Magnetite)", "C) Horseshoe magnet", "D) Electromagnet"],
        correctAnswer: "B",
        hint: "It was discovered by an ancient Greek shepherd named Magnes in Magnesia.",
        explanation: "Magnetite (Lodestone) is a naturally occurring magnetic rock found in nature."
      },
      {
        id: "m7",
        question: "What happens when a bar magnet is broken or cut into two equal halves across its length?",
        options: ["A) One piece gets only North pole, the other gets only South pole", "B) Each broken piece becomes a complete magnet with its own N and S poles", "C) Both pieces lose their magnetic attraction completely", "D) They turn into non-magnetic iron strips"],
        correctAnswer: "B",
        hint: "Magnetic poles always exist in pairs (dipoles) and cannot be isolated.",
        explanation: "Cutting a magnet creates two smaller magnets, each possessing a North and South pole."
      },
      {
        id: "m8",
        question: "Which action will cause a permanent magnet to lose its magnetic power (demagnetize)?",
        options: ["A) Keeping it in a cool dark wooden drawer", "B) Heating it strongly over a burner or hammering it repeatedly", "C) Storing it with soft iron keepers across its poles", "D) Wrapping it in soft cotton cloth"],
        correctAnswer: "B",
        hint: "Thermal energy and mechanical shock disrupt domain alignment.",
        explanation: "Heating, hammering, or dropping a magnet from a height causes it to lose its magnetism."
      },
      {
        id: "m9",
        question: "Which of the following materials is NON-MAGNETIC and will NOT be attracted by a magnet?",
        options: ["A) Nickel key", "B) Steel paperclip", "C) Brass door hinge / Plastic ruler", "D) Iron tack"],
        correctAnswer: "C",
        hint: "Brass, copper, aluminum, wood, and plastic are non-magnetic.",
        explanation: "Brass and plastic are non-magnetic materials that experience no force from a magnet."
      },
      {
        id: "m10",
        question: "Which of the following is the SUREST test for magnetism of an object?",
        options: ["A) Attraction", "B) Repulsion", "C) Weight measurement", "D) Heating"],
        correctAnswer: "B",
        hint: "An unmagnetized piece of iron is attracted by both poles of a magnet, but only two like magnetic poles repel.",
        explanation: "Repulsion is the only sure test of magnetism because attraction can happen between a magnet and any unmagnetized magnetic material."
      },
      {
        id: "m11",
        question: "When an unmagnetized iron nail is brought near a powerful bar magnet without touching it, the nail becomes temporarily magnetized and is attracted to the magnet. What is this phenomenon called?",
        options: ["A) Magnetic Induction", "B) Magnetic Conduction", "C) Magnetic Demagnetization", "D) Magnetic Dispersion"],
        correctAnswer: "A",
        hint: "Magnetism induced in a magnetic substance due to proximity of a nearby magnet.",
        explanation: "Magnetic induction is the process by which a magnetic material becomes magnetized when placed near or in contact with a magnet."
      },
      {
        id: "m12",
        question: "In the single-touch method of making a magnet, a bar magnet's North pole is stroked repeatedly from end A to end B of an iron bar. What polarity is developed at end B?",
        options: ["A) North Pole", "B) South Pole", "C) Neutral Pole", "D) Alternating Pole"],
        correctAnswer: "B",
        hint: "The end where the stroking magnet leaves the bar acquires OPPOSITE polarity to the stroking pole.",
        explanation: "In single-touch method, the trailing end (end B) develops opposite polarity to the stroking pole (North pole stroking creates a South pole at end B)."
      },
      {
        id: "m13",
        question: "Two bar magnets are stored in pairs using soft iron keepers. How should the magnets and keepers be arranged?",
        options: ["A) Like poles facing each other with no wooden spacer", "B) Unlike poles facing each other, separated by a wooden block, with soft iron keepers across both ends", "C) Wrapped in plastic foil without iron keepers", "D) Placed in a hot metallic container"],
        correctAnswer: "B",
        hint: "Keepers form closed magnetic loops to preserve magnetism over long periods.",
        explanation: "Bar magnets should be kept in pairs with opposite poles facing, separated by a non-magnetic wooden strip, and soft iron strips (keepers) placed across both ends."
      },
      {
        id: "m14",
        question: "To protect delicate electronic instruments from stray magnetic fields, they are enclosed inside a box made of which material?",
        options: ["A) Copper or Aluminum", "B) Soft Iron or High-permeability alloy", "C) Plastic or Glass", "D) Wood or Rubber"],
        correctAnswer: "B",
        hint: "Magnetic field lines prefer to pass through ferromagnetic material, creating a magnetic shield.",
        explanation: "Soft iron or high-permeability magnetic alloys channel magnetic flux lines around the interior cavity, providing magnetic shielding."
      },
      {
        id: "m15",
        question: "Where is the Earth's magnetic SOUTH pole geographically located?",
        options: ["A) Near Earth's Geographical South Pole in Antarctica", "B) Near Earth's Geographical North Pole in the Arctic", "C) Exactly at the Equator", "D) At the Prime Meridian"],
        correctAnswer: "B",
        hint: "Opposite poles attract; the North-seeking pole of a compass points geographic North because magnetic South lies there.",
        explanation: "Earth's magnetic South pole is situated near the Geographical North Pole, attracting the North pole of freely suspended compass needles."
      },
      {
        id: "m16",
        question: "How does the magnetic force of attraction between a bar magnet and an iron pin change as the distance between them is HALVED?",
        options: ["A) Force becomes half", "B) Force doubles", "C) Force increases significantly (quadruples)", "D) Force remains unchanged"],
        correctAnswer: "C",
        hint: "Magnetic force follows an inverse-square relationship with distance.",
        explanation: "Magnetic force increases non-linearly (approximately inversely proportional to square of distance) as distance decreases."
      },
      {
        id: "m17",
        question: "What are 'Neutral Points' in the magnetic field region surrounding a bar magnet placed in Earth's field?",
        options: ["A) Points where the magnet's field is maximum", "B) Points where the magnet's field exactly equals and cancels Earth's magnetic field (net force = 0)", "C) Points at the exact center of the bar magnet", "D) Points where a compass needle spins uncontrollably fast"],
        correctAnswer: "B",
        hint: "At neutral points, opposing magnetic field vectors cancel out completely.",
        explanation: "Neutral points are locations where the magnetic field of a bar magnet is equal in magnitude and opposite in direction to Earth's horizontal magnetic field."
      },
      {
        id: "m18",
        question: "Above a certain critical temperature called the Curie Temperature, what happens to a ferromagnetic permanent magnet?",
        options: ["A) It becomes a superconductor", "B) It loses its permanent magnetism completely and becomes paramagnetic", "C) Its magnetic power doubles", "D) It turns into an electrical insulator"],
        correctAnswer: "B",
        hint: "Thermal agitation disrupts domain alignment completely above Curie temperature (e.g., 770°C for iron).",
        explanation: "Above the Curie temperature, high thermal kinetic energy destroys long-range ferromagnetic domain alignment, converting it into a non-permanent paramagnetic material."
      },
      {
        id: "m19",
        question: "Which advantage does an ELECTROMAGNET have over a permanent bar magnet?",
        options: ["A) Its strength can be varied by changing electric current and number of coil turns", "B) Its magnetic polarity can be easily reversed by reversing current direction", "C) It can be turned ON and OFF instantly", "D) All of the above"],
        correctAnswer: "D",
        hint: "Electromagnets offer variable strength, reversible poles, and switchable operation.",
        explanation: "Electromagnets are controllable: current controls strength, current direction controls polarity, and switching current ON/OFF controls magnetic field activation."
      },
      {
        id: "m20",
        question: "Maglev (Magnetic Levitation) trains operate without touching the tracks by utilizing which magnetic principle?",
        options: ["A) Magnetic Attraction", "B) Magnetic Repulsion and Levitation", "C) Magnetic Induction of static friction", "D) Earth's gravity"],
        correctAnswer: "B",
        hint: "Like magnetic poles repel, creating a cushion of air between train and track.",
        explanation: "Maglev trains use powerful magnetic repulsion between superconducting electromagnets on the train and guideway tracks to levitate and eliminate mechanical friction."
      },
      {
        id: "m21",
        question: "How can you identify the North and South poles of an unmarked ring magnet?",
        options: ["A) By dipping it in water", "B) By suspending it horizontally by a thread or bringing a known bar magnet near its two flat faces", "C) By heating it on a flame", "D) Ring magnets do not have magnetic poles"],
        correctAnswer: "B",
        hint: "A ring magnet has its poles on its top and bottom circular faces.",
        explanation: "Ring magnets are axially magnetized; one flat circular face is North and the opposite face is South. Testing with a known bar magnet identifies them by attraction/repulsion."
      },
      {
        id: "m22",
        question: "Which of the following is a TRUE property of magnetic field lines around a bar magnet?",
        options: ["A) Field lines emerge from North pole and enter South pole OUTSIDE the magnet, forming continuous closed loops", "B) Magnetic field lines can intersect each other at right angles", "C) Field lines start at North pole and terminate permanently at South pole", "D) Field lines are straight parallel lines everywhere"],
        correctAnswer: "A",
        hint: "Magnetic field lines are continuous closed curves (N to S outside, S to N inside).",
        explanation: "Magnetic lines of force form continuous closed loops (N to S outside, S to N inside the magnet) and never intersect."
      },
      {
        id: "m23",
        question: "Which metallic alloy is famous for making powerful permanent magnets used in loudspeakers and electric motors?",
        options: ["A) Brass (Copper + Zinc)", "B) Alnico (Aluminum, Nickel, Cobalt) and Neodymium", "C) Stainless steel", "D) Bronze"],
        correctAnswer: "B",
        hint: "Alnico and Neodymium-Iron-Boron (NdFeB) form exceptionally strong permanent magnets.",
        explanation: "Alnico alloys and Neodymium rare-earth alloys possess very high coercivity and magnetic retentivity, ideal for strong permanent magnets."
      },
      {
        id: "m24",
        question: "When an iron nail attracted by a bar magnet lifts a second iron nail, and the main bar magnet is removed, what happens to the nails?",
        options: ["A) They remain glued together permanently", "B) The second nail falls off immediately because induced magnetism in soft iron is temporary", "C) The nails repel each other violently", "D) The nails melt"],
        correctAnswer: "B",
        hint: "Soft iron loses its induced magnetism as soon as the inducing magnet is removed.",
        explanation: "Soft iron has low retentivity; its induced magnetism disappears rapidly once the primary magnetizing field is withdrawn."
      },
      {
        id: "m25",
        question: "In industrial recycling yards, large crane-mounted ELECTROMAGNETS are used to sort scrap metal because they can:",
        options: ["A) Attract non-magnetic copper and aluminum selectively", "B) Easily pick up heavy ferrous iron/steel scrap and drop it instantly by turning current OFF", "C) Melt scrap metals instantly using magnetism", "D) Repel all metallic scrap into trucks"],
        correctAnswer: "B",
        hint: "Switching off electric current turns off magnetic attraction, dropping iron scrap into recycling bins.",
        explanation: "Industrial electromagnets efficiently separate ferromagnetic iron/steel scrap from non-ferrous materials (aluminum, plastic, copper) and drop the load on demand."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Opposite magnetic poles (North and South) attract each other.",
        reason: "Reason (R): Like magnetic poles (North and North) repel each other.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "B",
        explanation: "Both statements are true law facts of magnetism, but Reason (R) states the law of repulsion rather than explaining why attraction occurs between opposite poles."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): A magnet can be broken into a single isolated North pole.",
        reason: "Reason (R): Magnetic poles always exist in pairs (dipoles).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because monopoles do not exist; cutting a magnet creates two smaller magnets each with N and S poles. Reason is TRUE."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Heating or hammering a magnet can cause it to lose its magnetism.",
        reason: "Reason (R): Heating and rough handling disrupt the alignment of microscopic magnetic domains.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true and Reason (R) correctly explains thermal and mechanical demagnetization."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Magnets should be stored with magnetic keepers across their poles.",
        reason: "Reason (R): Magnetic keepers prevent self-demagnetization over long periods.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true. Soft iron keepers complete magnetic loops, preserving magnetic strength."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Paper and glass are magnetic substances.",
        reason: "Reason (R): Substances attracted by magnets are called magnetic materials.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE (paper and glass are non-magnetic). Reason is TRUE."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Soft iron is used to make temporary magnets, while steel or Alnico is used for permanent magnets.",
        reason: "Reason (R): Soft iron loses its magnetism rapidly as soon as the external magnetic influence is removed.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why soft iron forms temporary magnets."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): Repulsion is considered the surest test for identifying a magnet.",
        reason: "Reason (R): An unmagnetized iron bar is attracted by both North and South poles of a magnet, but repulsion occurs exclusively between two like magnetic poles.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately justifies why repulsion is the definitive test for magnetism."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): A horseshoe magnet has its North and South poles situated close to each other.",
        reason: "Reason (R): The U-shape brings both poles together so that their combined magnetic field provides a stronger lifting force on iron objects.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the design purpose of a horseshoe magnet."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): Pure copper and brass keys stick strongly to a bar magnet.",
        reason: "Reason (R): Copper and brass are non-magnetic materials.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (copper and brass do NOT stick to magnets). Reason (R) is TRUE."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): The magnetic needle of a compass comes to rest in the geographical North-South direction when left free.",
        reason: "Reason (R): The Earth acts like a giant magnet with its magnetic poles directing freely suspended magnets along the North-South axis.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why magnetic compasses work worldwide."
      },
      {
        id: "ar11",
        assertion: "Assertion (A): A soft iron cylinder placed inside a magnetic field concentrates magnetic flux lines inside itself.",
        reason: "Reason (R): Soft iron has high magnetic permeability, allowing magnetic lines of force to pass through it much more easily than through air.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why soft iron acts as a magnetic flux conductor and shield."
      },
      {
        id: "ar12",
        assertion: "Assertion (A): Magnetic lines of force never cross or intersect each other.",
        reason: "Reason (R): If two field lines intersected, a magnetic compass placed at the intersection point would point in two different directions at once, which is impossible.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) logically proves why field lines cannot intersect."
      },
      {
        id: "ar13",
        assertion: "Assertion (A): Earth's geographical North Pole attracts the North-seeking pole of a freely suspended bar magnet.",
        reason: "Reason (R): Near Earth's geographical North Pole lies Earth's magnetic South pole.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why opposite magnetic poles attract according to fundamental magnetic laws."
      },
      {
        id: "ar14",
        assertion: "Assertion (A): In the single-touch method of magnetization, the trailing end of an iron bar develops opposite polarity to the stroking pole.",
        reason: "Reason (R): As the stroking pole leaves the trailing end, it induces an opposite magnetic pole at that extremity.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains the magnetic induction mechanics of single-touch stroking."
      },
      {
        id: "ar15",
        assertion: "Assertion (A): Bar magnets are stored in pairs with opposite poles facing, separated by a wooden block and capped with soft iron keepers.",
        reason: "Reason (R): Iron keepers complete a closed magnetic loop, preventing self-demagnetization by trapping all magnetic field lines.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why keepers preserve magnetic domain alignment over years."
      },
      {
        id: "ar16",
        assertion: "Assertion (A): An industrial electromagnet can pick up heavy steel scrap and drop it instantly into a container.",
        reason: "Reason (R): The magnetic field of an electromagnet exists only as long as electric current flows through its wire coil.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the operational cause behind switchable electromagnets."
      },
      {
        id: "ar17",
        assertion: "Assertion (A): Repulsion is the only definitive test to confirm that an unknown metal bar is a permanent magnet.",
        reason: "Reason (R): Both North and South poles of a magnet can attract an unmagnetized piece of iron, but repulsion occurs strictly between two like magnetic poles.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains why attraction is ambiguous while repulsion is conclusive."
      },
      {
        id: "ar18",
        assertion: "Assertion (A): Heating a bar magnet to red hot temperature permanently destroys its magnetism.",
        reason: "Reason (R): Thermal kinetic agitation at high temperatures disrupts the organized domain alignment of ferromagnetic atoms.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the atomic-level thermodynamic cause of demagnetization."
      },
      {
        id: "ar19",
        assertion: "Assertion (A): Bringing a strong neodymium magnet near a compass needle alters its North-South alignment.",
        reason: "Reason (R): The strong localized magnetic field of the neodymium magnet overrides Earth's weaker ambient horizontal magnetic field.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains vector field dominance at short distances."
      },
      {
        id: "ar20",
        assertion: "Assertion (A): The North and South poles of a ring magnet lie on its flat circular top and bottom faces.",
        reason: "Reason (R): Ring magnets are magnetized across their axial thickness, producing axial magnetic dipole orientation.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) describes the axial magnetization geometry of ring magnets."
      },
      {
        id: "ar21",
        assertion: "Assertion (A): Magnetic monopoles (isolated single North or South poles) are commonly found in nature.",
        reason: "Reason (R): Even if a bar magnet is broken repeatedly into tiny microscopic fragments, each fragment retains both a North and a South pole.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (monopoles do NOT exist in nature). Reason (R) is TRUE."
      },
      {
        id: "ar22",
        assertion: "Assertion (A): Maglev trains levitate above guideway tracks and achieve high speeds with zero wheel friction.",
        reason: "Reason (R): Maglev systems utilize powerful magnetic repulsion between superconducting electromagnets on train and track.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains the physical mechanism of friction-free magnetic levitation."
      },
      {
        id: "ar23",
        assertion: "Assertion (A): A copper wire coil wrapped around a wooden stick creates a powerful permanent magnet when connected to a battery.",
        reason: "Reason (R): Wood and copper are strongly ferromagnetic materials that retain magnetism permanently.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (copper and wood are non-magnetic). Reason (R) is FALSE."
      },
      {
        id: "ar24",
        assertion: "Assertion (A): Plastic and rubber containers are used to shield precision compasses from external magnetic fields.",
        reason: "Reason (R): Plastic and rubber destroy magnetic field lines completely upon contact.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (soft iron is needed for magnetic shielding, non-magnetic plastic allows magnetic field lines to pass through freely). Reason (R) is FALSE."
      },
      {
        id: "ar25",
        assertion: "Assertion (A): Iron filings sprinkled on a paper card placed over a bar magnet arrange themselves in distinct continuous curves.",
        reason: "Reason (R): Induced magnetic dipoles in tiny iron filings align along the invisible magnetic field lines of the bar magnet.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why iron filings trace magnetic field line patterns."
      }
    ]
  },

  g6_phys_temp: {
    chapterId: "g6_phys_temp",
    chapterTitle: "Temperature and its Measurement",
    mcqs: [
      {
        id: "m1",
        question: "What is the normal temperature of a healthy human body?",
        options: ["A) 37°C (98.6°F)", "B) 100°C (212°F)", "C) 0°C (32°F)", "D) 42°C (107.6°F)"],
        correctAnswer: "A",
        hint: "37 degrees on the Celsius scale corresponds to 98.6 degrees on the Fahrenheit scale.",
        explanation: "The normal human body temperature is approximately 37°C or 98.6°F."
      },
      {
        id: "m2",
        question: "Why does a clinical thermometer have a kink (constriction) in its capillary tube near the bulb?",
        options: ["A) To make the thermometer look pretty", "B) To prevent the mercury level from falling on its own after removing from mouth", "C) To make mercury flow faster", "D) To increase the boiling point of mercury"],
        correctAnswer: "B",
        hint: "It holds the mercury column in place long enough for a accurate reading.",
        explanation: "The kink prevents mercury from flowing back into the bulb when taken out of the mouth, allowing accurate reading."
      },
      {
        id: "m3",
        question: "What is the standard measurement range of a laboratory thermometer?",
        options: ["A) 35°C to 42°C", "B) -10°C to 110°C", "C) 0°C to 37°C", "D) 100°C to 200°C"],
        correctAnswer: "B",
        hint: "Laboratory thermometers measure both freezing ice and boiling water.",
        explanation: "A standard laboratory thermometer has a range from -10°C to 110°C."
      },
      {
        id: "m4",
        question: "What is the SI unit of temperature?",
        options: ["A) Degree Celsius (°C)", "B) Degree Fahrenheit (°F)", "C) Kelvin (K)", "D) Joule (J)"],
        correctAnswer: "C",
        hint: "The International System of Units uses absolute temperature scale.",
        explanation: "Kelvin (K) is the official SI unit of temperature."
      },
      {
        id: "m5",
        question: "What is the measurement range of a standard Clinical Thermometer?",
        options: ["A) -10°C to 110°C", "B) 35°C to 42°C", "C) 0°C to 100°C", "D) 20°C to 50°C"],
        correctAnswer: "B",
        hint: "Human body temperature varies only within a narrow band around 37°C.",
        explanation: "A clinical thermometer is scaled from 35°C to 42°C because human body temperature stays strictly in this range."
      },
      {
        id: "m6",
        question: "Why can a clinical thermometer NOT be used to measure the temperature of boiling water?",
        options: ["A) Boiling water is too cold for the glass bulb", "B) The thermometer will break because boiling water (100°C) far exceeds its 42°C maximum scale limit", "C) Mercury inside freezes instantly", "D) Glass becomes completely transparent"],
        correctAnswer: "B",
        hint: "Clinical thermometers are designed solely for body temperature (max 42°C).",
        explanation: "Boiling water is at 100°C. Immersing a clinical thermometer in it will cause mercury to expand beyond 42°C and burst the glass tube."
      },
      {
        id: "m7",
        question: "Which metal liquid is traditionally used in glass thermometers because it expands uniformly and does not stick to glass?",
        options: ["A) Water", "B) Mercury", "C) Kerosene", "D) Liquid nitrogen"],
        correctAnswer: "B",
        hint: "This shiny metallic liquid remains liquid at room temperature and is easily visible in capillary tubes.",
        explanation: "Mercury expands uniformly with heat rise, is opaque, shiny, and does not stick to the glass walls."
      },
      {
        id: "m8",
        question: "At what temperature on the Celsius scale does pure water freeze into ice at standard atmospheric pressure?",
        options: ["A) 100°C", "B) 37°C", "C) 0°C", "D) -10°C"],
        correctAnswer: "C",
        hint: "This is the lower fixed point on the Celsius temperature scale.",
        explanation: "0°C is defined as the freezing point of pure water on the Celsius scale."
      },
      {
        id: "m9",
        question: "Which modern thermometer measures body temperature using infrared heat radiation without any mercury?",
        options: ["A) Mercury clinical thermometer", "B) Digital / Infrared thermometer", "C) Laboratory thermometer", "D) Maximum-minimum thermometer"],
        correctAnswer: "B",
        hint: "It displays temperature on an LCD screen and is safe from glass breakage or mercury toxicity.",
        explanation: "Digital and infrared forehead/ear thermometers detect thermal radiation electronically and display temperature on an LCD screen without using mercury."
      },
      {
        id: "m10",
        question: "What is the mathematical relation between Celsius (°C) and Fahrenheit (°F) temperature scales?",
        options: ["A) F = (9/5 × C) + 32", "B) F = C + 100", "C) F = C ÷ 32", "D) F = 2C + 32"],
        correctAnswer: "A",
        hint: "37°C converts to 98.6°F using this conversion formula.",
        explanation: "The conversion formula between Celsius and Fahrenheit is F = (9/5 × C) + 32."
      },
      {
        id: "m11",
        question: "What is 'parallax error' when taking a measurement from a thermometer scale or ruler?",
        options: ["A) An error caused by holding the thermometer upside down", "B) An apparent shift in reading caused by viewing the liquid meniscus or scale mark from an oblique (slanting) angle instead of direct perpendicular eye level", "C) An error caused by mercury freezing in cold weather", "D) An error caused by washing glass with antiseptic"],
        correctAnswer: "B",
        hint: "It occurs when your line of sight is tilted above or below the level of the mark.",
        explanation: "Parallax error happens when your line of sight is not perpendicular to the scale mark. Looking from above or below makes the level line up with higher or lower marks on the scale."
      },
      {
        id: "m12",
        question: "How can you completely prevent parallax error while reading a liquid-in-glass thermometer?",
        options: ["A) Keep your line of sight directly level and perpendicular with the top of the liquid column", "B) Look down at the meniscus from above at a 45° angle", "C) Hold the thermometer bulb firmly in your hand while reading", "D) Tilt the thermometer sideways while looking at it"],
        correctAnswer: "A",
        hint: "Your eye must form a straight 90-degree line with the top of the mercury/alcohol column.",
        explanation: "By keeping your eye at the exact horizontal level of the liquid surface (perpendicular view), line of sight parallax distortion is eliminated."
      },
      {
        id: "m13",
        question: "Which special type of thermometer is used in meteorology to record the highest and lowest temperatures of a day for weather forecasting?",
        options: ["A) Clinical thermometer", "B) Maximum-Minimum thermometer (Six's thermometer)", "C) Laboratory thermometer", "D) Digital thermistor probe"],
        correctAnswer: "B",
        hint: "It records extreme temperatures over a 24-hour cycle.",
        explanation: "Maximum-Minimum thermometers record the maximum (daytime peak) and minimum (early morning trough) atmospheric temperatures for weather reports."
      },
      {
        id: "m14",
        question: "Why is alcohol often preferred over mercury in thermometers designed for extremely cold sub-zero polar regions?",
        options: ["A) Alcohol freezes at a much lower temperature (-114°C) than mercury (-39°C)", "B) Alcohol boils at a higher temperature than mercury", "C) Alcohol is a liquid metal", "D) Alcohol does not expand on heating"],
        correctAnswer: "A",
        hint: "Mercury turns solid at -39°C, while alcohol remains liquid down to -114°C.",
        explanation: "Alcohol has a very low freezing point of -114°C, allowing it to measure extreme sub-zero weather where mercury would freeze solid at -39°C."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): We cannot rely on our sense of touch to measure hotness or coldness accurately.",
        reason: "Reason (R): Sense of touch is relative and affected by previous thermal conditions of the skin.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why touch is unreliable."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): A clinical thermometer must be jerked a few times before taking a new body temperature measurement.",
        reason: "Reason (R): Jerking forces the mercury column back down below the 35°C mark past the kink.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why jerking is necessary to reset the mercury level."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): A laboratory thermometer must be read while its bulb is still immersed in the substance being measured.",
        reason: "Reason (R): Laboratory thermometers lack a kink, causing the mercury level to drop immediately upon removal from the hot liquid.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why laboratory thermometers must be read in-situ."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Water is used as the thermometric liquid inside clinical thermometers.",
        reason: "Reason (R): Mercury is preferred in thermometers because it expands uniformly and does not stick to glass capillary walls.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (water freezes at 0°C and sticks to glass; mercury is used). Reason (R) is TRUE."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Digital thermometers are widely preferred over traditional glass mercury thermometers.",
        reason: "Reason (R): Mercury is a toxic metallic element that poses health hazards if a glass thermometer accidentally breaks.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains the safety reason for preferring digital thermometers."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): The temperature scale of a clinical thermometer ranges strictly from 35°C to 42°C.",
        reason: "Reason (R): The temperature of a living human body never goes below 35°C or above 42°C.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) justifies the specific range chosen for clinical thermometers."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): Heat energy spontaneously flows from a body at higher temperature to a body at lower temperature.",
        reason: "Reason (R): Temperature is a quantitative measure of the degree of hotness or coldness of a body.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "B",
        explanation: "Both statements are true facts of physics, but Reason (R) defines temperature rather than explaining the thermodynamic cause of heat flow."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): 0°C on the Celsius scale corresponds to 32°F on the Fahrenheit scale.",
        reason: "Reason (R): 0°C and 32°F represent the exact freezing point of pure water under standard pressure.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) provides the reference point equivalence."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): When taking a scale reading on a liquid thermometer, the line of sight must be horizontal and level with the liquid surface.",
        reason: "Reason (R): Viewing the meniscus from an inclined angle introduces parallax error in temperature reading.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains why proper eye alignment is necessary."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): Maximum-Minimum thermometers are used in weather forecasting stations.",
        reason: "Reason (R): Maximum-Minimum thermometers automatically record the highest and lowest temperatures reached during a 24-hour day.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why meteorologists use Maximum-Minimum thermometers."
      }
    ]
  },

  g6_phys_beyond_earth: {
    chapterId: "g6_phys_beyond_earth",
    chapterTitle: "Beyond Earth",
    mcqs: [
      {
        id: "m1",
        question: "Which celestial body is located at the center of our Solar System?",
        options: ["A) Earth", "B) Moon", "C) Sun", "D) Jupiter"],
        correctAnswer: "C",
        hint: "All 8 planets revolve around this glowing ball of hot gas.",
        explanation: "The Sun is at the center of the Solar System and exerts gravitational pull on all planets."
      },
      {
        id: "m2",
        question: "What motion of the Earth causes Day and Night?",
        options: ["A) Revolution around the Sun", "B) Rotation on its own axis", "C) Tilt of the orbit", "D) Precession"],
        correctAnswer: "B",
        hint: "Earth spins on its axis once every 24 hours.",
        explanation: "Earth's rotation on its axis once every 24 hours causes day for the hemisphere facing the Sun and night for the other."
      },
      {
        id: "m3",
        question: "Which constellation is also known as the 'Saptarishi' or Great Bear?",
        options: ["A) Orion", "B) Cassiopeia", "C) Ursa Major", "D) Leo"],
        correctAnswer: "C",
        hint: "It contains seven prominent stars forming a ladle or big dipper shape.",
        explanation: "Ursa Major is known as Saptarishi in India."
      },
      {
        id: "m4",
        question: "Which planet is known as the 'Red Planet'?",
        options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Mercury"],
        correctAnswer: "B",
        hint: "Iron oxide dust on its surface gives it a reddish appearance.",
        explanation: "Mars appears red due to iron oxide minerals on its surface."
      },
      {
        id: "m5",
        question: "Which star remains fixed at one position in the northern night sky and helps travelers find the North direction?",
        options: ["A) Sirius", "B) Pole Star (Polaris)", "C) Alpha Centauri", "D) Betelgeuse"],
        correctAnswer: "B",
        hint: "It lies directly above the Earth's rotational axis in the North.",
        explanation: "The Pole Star (Polaris) indicates the geographical North direction because it lies along Earth's rotational axis."
      },
      {
        id: "m6",
        question: "How long does Earth take to complete ONE full revolution around the Sun?",
        options: ["A) 24 hours", "B) 30 days", "C) 365¼ days (1 year)", "D) 12 hours"],
        correctAnswer: "C",
        hint: "This duration forms one solar year.",
        explanation: "Earth completes one full orbit (revolution) around the Sun in 365.25 days."
      },
      {
        id: "m7",
        question: "What primary factors cause the change of Seasons (Summer, Winter, Spring, Autumn) on Earth?",
        options: ["A) Rotation of Earth on its axis", "B) Tilting of Earth's axis combined with its revolution around the Sun", "C) Distance variation between Earth and Moon", "D) Solar wind intensity"],
        correctAnswer: "B",
        hint: "The 23.5° tilt of Earth's axis causes different hemispheres to lean towards or away from the Sun during revolution.",
        explanation: "The tilt of Earth's rotational axis along with its revolution around the Sun causes varying intensity of sunlight, producing changing seasons."
      },
      {
        id: "m8",
        question: "Celestial bodies that revolve around planets in fixed orbits are called:",
        options: ["A) Asteroids", "B) Natural Satellites (Moons)", "C) Comets", "D) Meteors"],
        correctAnswer: "B",
        hint: "Earth's Moon is a classic example.",
        explanation: "Natural satellites (like Earth's Moon) orbit around planets due to gravitational attraction."
      },
      {
        id: "m9",
        question: "Which planet in our Solar System is the LARGEST in size?",
        options: ["A) Saturn", "B) Jupiter", "C) Neptune", "D) Earth"],
        correctAnswer: "B",
        hint: "This gas giant has a famous Great Red Spot storm.",
        explanation: "Jupiter is the largest planet in the Solar System, more than 1,300 times the volume of Earth."
      },
      {
        id: "m10",
        question: "Why do stars appear to move slowly from East to West across the night sky?",
        options: ["A) Because stars revolve around Earth from East to West", "B) Because Earth rotates on its axis from West to East", "C) Due to lunar gravitational pull", "D) Because stars move faster than planets"],
        correctAnswer: "B",
        hint: "When you spin clockwise on a swivel chair, surrounding room objects seem to rotate counter-clockwise.",
        explanation: "Earth's West-to-East rotation creates the relative apparent movement of heavenly bodies from East to West."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): The Moon changes its shape every night.",
        reason: "Reason (R): The Moon produces its own light that glows brighter during full moon.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "C",
        explanation: "Assertion is TRUE (we see changing illuminated portions/phases of the Moon). Reason is FALSE because the Moon is non-luminous and reflects sunlight."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): The Pole Star appears fixed at one position in the northern sky throughout the night.",
        reason: "Reason (R): The Pole Star is situated directly along the line of Earth's axis of rotation in the North.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why the Pole Star appears motionless."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Planets do not twinkle at night, whereas distant stars twinkle visibly.",
        reason: "Reason (R): Planets are much closer to Earth than stars and appear as extended sources of light, averaging out atmospheric atmospheric turbulence.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains why planets produce a steady light."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): On a New Moon day (Amavasya), the Moon is not visible in the night sky.",
        reason: "Reason (R): During New Moon, the Moon lies between Earth and Sun, facing its unlit dark side toward Earth.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why the Moon is invisible on New Moon."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Earth is the only known planet in our Solar System that supports life.",
        reason: "Reason (R): Earth possesses liquid water, an oxygen-rich atmosphere, and a protective ozone layer at moderate temperature.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) lists the crucial conditions supporting terrestrial life."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Constellations are recognizable patterns or shapes formed by groups of distant stars.",
        reason: "Reason (R): Orion (The Hunter) and Ursa Major (Saptarishi) are prominent examples of constellations.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives well-known examples of constellations."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): Shooting stars (meteors) are actual stars falling out of space.",
        reason: "Reason (R): Meteors are small rocky pieces (meteoroids) that burn up due to high friction when entering Earth's atmosphere.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (shooting stars are meteors, not real stars). Reason (R) is TRUE."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): Venus is the hottest planet in the Solar System, even though Mercury is closest to the Sun.",
        reason: "Reason (R): Venus has a thick atmosphere composed mostly of carbon dioxide that traps heat through an intense greenhouse effect.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why Venus reaches extreme surface temperatures."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): The Sun is classified as a star.",
        reason: "Reason (R): The Sun emits its own light and heat generated by nuclear reactions at its core.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the defining characteristics of a star."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): Distances between stars in astronomy are measured in kilometers.",
        reason: "Reason (R): A light-year is the distance traveled by light in one year and is used to measure vast interstellar distances.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (kilometers are too small; light-years are used). Reason (R) is TRUE."
      }
    ]
  },

  g6_eng_grammar: {
    chapterId: "g6_eng_grammar",
    chapterTitle: "Grade 6 English: Grammar & Sentence Mechanics",
    mcqs: [
      {
        id: "e1",
        question: "Identify the Abstract Noun in the sentence: 'The king was known throughout the land for his immense wisdom.'",
        options: ["A) King", "B) Land", "C) Wisdom", "D) Throughout"],
        correctAnswer: "C",
        hint: "An abstract noun refers to a quality or idea that cannot be physically seen or touched.",
        explanation: "'Wisdom' is an abstract noun because it names a virtue/quality rather than a physical object."
      },
      {
        id: "e2",
        question: "Which article should correctly fill the blank: 'It took us ______ hour to complete the English test.'",
        options: ["A) a", "B) an", "C) the", "D) no article needed"],
        correctAnswer: "B",
        hint: "Look at the sound of the word 'hour'—the 'h' is silent!",
        explanation: "'Hour' begins with a vowel sound ('ow-er'), so we use the indefinite article 'an'."
      },
      {
        id: "e3",
        question: "Choose the correct verb form for Subject-Verb Agreement: 'Neither the teacher nor the students ______ present in the auditorium.'",
        options: ["A) was", "B) were", "C) is", "D) has"],
        correctAnswer: "B",
        hint: "When subjects are joined by 'neither... nor', the verb agrees with the subject closer to it ('students').",
        explanation: "'Students' is plural and closer to the verb, so the plural verb 'were' is used."
      },
      {
        id: "e4",
        question: "What type of sentence is: 'Please pass the salt and pepper.'?",
        options: ["A) Declarative", "B) Interrogative", "C) Imperative", "D) Exclamatory"],
        correctAnswer: "C",
        hint: "This sentence expresses a polite request or command.",
        explanation: "Imperative sentences express commands, instructions, advice, or polite requests."
      },
      {
        id: "e5",
        question: "Identify the preposition in the sentence: 'The wooden bench is placed under the shade of a banyan tree.'",
        options: ["A) Wooden", "B) Bench", "C) Under", "D) Placed"],
        correctAnswer: "C",
        hint: "Which word tells the position of the bench relative to the shade?",
        explanation: "'Under' is a preposition showing spatial position/location."
      },
      {
        id: "e6",
        question: "Convert the following simple present sentence into Simple Past Tense: 'Rohan catches the ball cleanly.'",
        options: ["A) Rohan catched the ball cleanly.", "B) Rohan caught the ball cleanly.", "C) Rohan is catching the ball cleanly.", "D) Rohan will catch the ball cleanly."],
        correctAnswer: "B",
        hint: "The irregular past tense of 'catch' is 'caught'.",
        explanation: "The past tense of the irregular verb 'catch' is 'caught'."
      },
      {
        id: "e7",
        question: "Which subscription (sign-off) is MOST appropriate at the end of a Formal Leave Application to your School Principal?",
        options: ["A) Yours lovingly", "B) Your affectionate friend", "C) Yours obediently", "D) Cheers"],
        correctAnswer: "C",
        hint: "Formal applications to school authorities require polite, respectful sign-offs.",
        explanation: "'Yours obediently' or 'Yours faithfully' is used for formal applications to principals or teachers."
      },
      {
        id: "e8",
        question: "Which of the following elements is strictly NOT included in an Informal Letter to a friend?",
        options: ["A) Sender's Address", "B) Date", "C) Subject Line", "D) Friendly Salutation (Dear...)"],
        correctAnswer: "C",
        hint: "Personal informal letters omit official administrative summary lines.",
        explanation: "A 'Subject Line' is required only in Formal Letters to state the objective concisely."
      }
    ],
    assertionReasons: [
      {
        id: "ear1",
        assertion: "In English grammar, we use 'an' before the word 'honest'.",
        reason: "The initial letter 'h' in 'honest' is silent, so the word begins with a vowel sound.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both Assertion and Reason are true, and the silent 'h' vowel sound is the exact reason why 'an' is used."
      },
      {
        id: "ear2",
        assertion: "A singular noun always requires a plural verb in a standard sentence.",
        reason: "According to the Subject-Verb Agreement rule, singular subjects take singular verbs and plural subjects take singular verbs.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (singular subjects take singular verbs). Reason (R) is TRUE."
      },
      {
        id: "ear3",
        assertion: "A formal leave application to the school principal must include a clear Subject line.",
        reason: "The subject line enables the reader to instantly understand the purpose of the official request.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both Assertion and Reason are true, and Reason correctly explains why a subject line is essential in formal letters."
      }
    ]
  },

  g9_physics_motion: {
    chapterId: "g9_physics_motion",
    chapterTitle: "Motion (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "What is the numerical ratio of displacement to distance for a moving object?",
        options: ["A) Always greater than 1", "B) Always less than 1", "C) Equal to or less than 1", "D) Equal to 0"],
        correctAnswer: "C",
        hint: "Displacement is the shortest straight line distance between initial and final points, while distance is total path length.",
        explanation: "Displacement ≤ Distance. Hence, Displacement / Distance ≤ 1."
      },
      {
        id: "m2",
        question: "What does the slope of a distance-time graph represent?",
        options: ["A) Acceleration", "B) Velocity / Speed", "C) Force", "D) Momentum"],
        correctAnswer: "B",
        hint: "Slope = Δy / Δx = Distance / Time.",
        explanation: "The slope of a distance-time graph gives the speed or magnitude of velocity."
      },
      {
        id: "m3",
        question: "A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?",
        options: ["A) 2 m/s²", "B) 4 m/s²", "C) 100 m/s²", "D) 0.25 m/s²"],
        correctAnswer: "B",
        hint: "Use formula: a = (v - u) / t, where u = 0, v = 20 m/s, t = 5 s.",
        explanation: "a = (20 - 0) / 5 = 4 m/s²."
      },
      {
        id: "m4",
        question: "Area under a Velocity-Time graph represents which physical quantity?",
        options: ["A) Speed", "B) Acceleration", "C) Distance / Displacement", "D) Time"],
        correctAnswer: "C",
        hint: "Area = Velocity × Time = (m/s) × s = meters.",
        explanation: "The area bounded under a v-t graph equals the displacement covered by the body."
      },
      {
        id: "m5",
        question: "Which of the following equations represents Newton's first equation of motion for uniform acceleration?",
        options: ["A) s = ut + ½ at²", "B) v = u + at", "C) v² - u² = 2as", "D) F = ma"],
        correctAnswer: "B",
        hint: "Relates final velocity v, initial velocity u, acceleration a, and time t.",
        explanation: "v = u + at is the 1st equation of motion."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): An object can have zero displacement even if it has traveled a non-zero distance.",
        reason: "Reason (R): Displacement is a vector quantity defined as the shortest distance between initial and final positions.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true. If an athlete runs around a circular track and returns to the starting point, distance > 0 but displacement = 0."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Uniform circular motion is an accelerated motion.",
        reason: "Reason (R): In uniform circular motion, the speed remains constant but the direction of velocity changes continuously.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true and Reason (R) accurately explains why change in velocity direction causes centripetal acceleration."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): The SI unit of acceleration is meters per second (m/s).",
        reason: "Reason (R): Acceleration is the rate of change of velocity with respect to time.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because SI unit of acceleration is m/s² (m/s is unit of speed). Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): A body moving with constant speed can have non-zero acceleration.",
        reason: "Reason (R): Acceleration occurs whenever speed or direction of motion changes.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both are true (e.g. constant speed circular motion has centripetal acceleration)."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): The third equation of motion is v² - u² = 2as.",
        reason: "Reason (R): It eliminates the time variable t to directly link velocities, acceleration, and displacement.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly describes the mathematical role of the 3rd motion equation."
      }
    ]
  },

  g9_physics_force: {
    chapterId: "g9_physics_force",
    chapterTitle: "Force and Laws of Motion",
    mcqs: [
      {
        id: "m1",
        question: "Which property of a body measures its resistance to change its state of rest or motion (Inertia)?",
        options: ["A) Velocity", "B) Volume", "C) Mass", "D) Acceleration"],
        correctAnswer: "C",
        hint: "Heavier bodies require more force to change their state of motion.",
        explanation: "Mass is the quantitative measure of inertia."
      },
      {
        id: "m2",
        question: "Newton's Second Law of Motion gives the mathematical formula for Force as:",
        options: ["A) F = m / a", "B) F = m × a", "C) F = m + a", "D) F = ½ ma²"],
        correctAnswer: "B",
        hint: "Force is equal to mass times acceleration (rate of change of momentum).",
        explanation: "F = ma derived from F = dp/dt."
      },
      {
        id: "m3",
        question: "When a passenger is sitting in a bus that suddenly starts moving forward, why does the passenger fall backward?",
        options: ["A) Due to gravity", "B) Due to inertia of rest", "C) Due to friction", "D) Due to centrifugal force"],
        correctAnswer: "B",
        hint: "The lower body moves with the bus while the upper body tends to remain at rest.",
        explanation: "Inertia of rest causes the upper body to stay in position while feet move forward with the bus."
      },
      {
        id: "m4",
        question: "What is the SI unit of linear momentum (p = mv)?",
        options: ["A) kg·m/s", "B) kg·m/s²", "C) Newton (N)", "D) Joules (J)"],
        correctAnswer: "A",
        hint: "Momentum = Mass (kg) × Velocity (m/s).",
        explanation: "Unit of momentum = kg × m/s = kg·m/s."
      },
      {
        id: "m5",
        question: "Action and Reaction forces mentioned in Newton's Third Law:",
        options: ["A) Act on the same body in opposite directions", "B) Act on two different bodies in opposite directions with equal magnitude", "C) Are unbalanced forces", "D) Cancel each other completely on a single object"],
        correctAnswer: "B",
        hint: "For every action, there is an equal and opposite reaction acting on different objects.",
        explanation: "Action and reaction forces act on two distinct objects, so they do not cancel each other out."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): When a cricketer pulls his hands backward while catching a fast moving cricket ball, it reduces the force of impact.",
        reason: "Reason (R): Increasing the time interval of catch decreases the rate of change of momentum (F = Δp / Δt).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains impulse-momentum theorem in cricket catching."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): A heavy truck has greater inertia than a small toy car.",
        reason: "Reason (R): Inertia of an object is directly proportional to its mass.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) is the exact scientific explanation."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Recoil velocity of a gun is equal to the velocity of the bullet fired.",
        reason: "Reason (R): Total linear momentum of an isolated system remains conserved.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because the heavy gun recoils with much SMALLER velocity than the lightweight bullet (m_gun * V_recoil = - m_bullet * v_bullet). Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Newton's first law of motion is also known as the Law of Inertia.",
        reason: "Reason (R): An object remains at rest or in uniform motion unless acted upon by an external unbalanced force.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) defines Newton's First Law."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): 1 Newton force produces an acceleration of 1 m/s² in a body of mass 1 kg.",
        reason: "Reason (R): 1 N = 1 kg·m/s².",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      }
    ]
  },

  g6_phys_ch1: {
    chapterId: "g6_phys_ch1",
    chapterTitle: "Chapter 1: The Wonderful World of Science & Components of Food",
    mcqs: [
      {
        id: "ch1_m1",
        question: "Which component of food gives us instant energy for daily physical and mental activities?",
        options: ["A) Carbohydrates", "B) Proteins", "C) Water", "D) Minerals"],
        correctAnswer: "A",
        hint: "Starch and sugars belong to this energy-giving nutrient group.",
        explanation: "Carbohydrates are the body's primary and fastest source of energy."
      },
      {
        id: "ch1_m2",
        question: "Which nutrient test turns iodine solution into a blue-black color?",
        options: ["A) Test for Fat", "B) Test for Starch", "C) Test for Protein", "D) Test for Vitamin C"],
        correctAnswer: "B",
        hint: "This test is performed on raw potato or bread slices.",
        explanation: "Iodine solution reacts with starch to form a dark blue-black complex."
      },
      {
        id: "ch1_m3",
        question: "Deficiency of Vitamin C in daily diet causes which disease?",
        options: ["A) Beriberi", "B) Scurvy", "C) Rickets", "D) Goitre"],
        correctAnswer: "B",
        hint: "This deficiency leads to bleeding gums and slow wound healing.",
        explanation: "Lack of Vitamin C causes Scurvy. Citrus fruits like oranges and amla prevent it."
      },
      {
        id: "ch1_m4",
        question: "Which mineral is essential for the production of red blood cells and hemoglobin?",
        options: ["A) Calcium", "B) Iodine", "C) Iron", "D) Sodium"],
        correctAnswer: "C",
        hint: "Lack of this mineral causes Anemia and fatigue.",
        explanation: "Iron is required to synthesize hemoglobin. Spinach, apples, and jaggery are rich in iron."
      },
      {
        id: "ch1_m5",
        question: "Proteins are primarily known as:",
        options: ["A) Energy givers", "B) Body-building foods", "C) Roughage carriers", "D) Solvent agents"],
        correctAnswer: "B",
        hint: "They are needed for growth, muscle development, and repair of damaged tissues.",
        explanation: "Proteins build body tissues and repair wear and tear, so they are called body-building foods."
      }
    ],
    assertionReasons: [
      {
        id: "ch1_ar1",
        assertion: "Assertion (A): Roughage (dietary fibre) does not provide any nutrients to our body, yet it is an essential component of a healthy diet.",
        reason: "Reason (R): Roughage adds bulk to unabsorbed food and helps our body get rid of undigested waste, preventing constipation.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both Assertion and Reason are true, and Reason is the correct scientific explanation."
      },
      {
        id: "ch1_ar2",
        assertion: "Assertion (A): Vitamin D helps our body use calcium for strong bones and teeth.",
        reason: "Reason (R): Our body can synthesize Vitamin D naturally in the presence of sunlight.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "B",
        explanation: "Both statements are true facts, but Reason (R) describes how it is synthesized, not why it aids calcium absorption."
      }
    ]
  },

  // ==========================================
  // MATHEMATICS CHAPTERS (GRADE 6 & GRADE 9)
  // ==========================================
  numbersystem: {
    chapterId: "numbersystem",
    chapterTitle: "Knowing Our Numbers (Grade 6)",
    mcqs: [
      {
        id: "g6_m1",
        question: "Which is the greatest 5-digit number that can be formed using the digits 7, 3, 0, 9, 5 without repeating any digit?",
        options: ["A) 97530", "B) 97503", "C) 95730", "D) 03579"],
        correctAnswer: "A",
        hint: "To form the greatest number, arrange the given digits in descending order from left to right.",
        explanation: "Arranging digits in descending order gives 9, 7, 5, 3, 0 -> 97,530."
      },
      {
        id: "g6_m2",
        question: "In the International System of Numeration, 1 Million is equal to how many Lakhs in the Indian System?",
        options: ["A) 1 Lakh", "B) 10 Lakhs", "C) 100 Lakhs", "D) 1000 Lakhs"],
        correctAnswer: "B",
        hint: "1 Million = 1,000,000. In Indian system 1,000,000 is written as 10,000,000? No, 10,000,000 is 1 Crore, 10,000,000 is 10 Lakhs (10,000,000). 1,000,000 = 10 Lakhs.",
        explanation: "1 Million = 1,000,000. In the Indian Place Value System, 10,00,000 = 10 Lakhs."
      },
      {
        id: "g6_m3",
        question: "What is the estimated sum of 730 + 998 when rounded off to the nearest hundreds?",
        options: ["A) 1700", "B) 1730", "C) 1800", "D) 1728"],
        correctAnswer: "A",
        hint: "Round 730 to nearest hundred (700) and 998 to nearest hundred (1000), then add.",
        explanation: "730 rounds off to 700. 998 rounds off to 1000. Estimated Sum = 700 + 1000 = 1700."
      },
      {
        id: "g6_m4",
        question: "Which expression demonstrates the distributive property for 7 × 109 using brackets?",
        options: ["A) 7 × (100 + 9)", "B) (7 + 100) × 9", "C) 7 + (100 × 9)", "D) (7 × 100) + 9"],
        correctAnswer: "A",
        hint: "Split 109 into (100 + 9) and multiply by 7.",
        explanation: "7 × 109 = 7 × (100 + 9) = (7 × 100) + (7 × 9) = 700 + 63 = 763."
      },
      {
        id: "g6_m5",
        question: "What is the Roman numeral representation for the number 94?",
        options: ["A) LXXXXIV", "B) XCIV", "C) CXIV", "D) XCVI"],
        correctAnswer: "B",
        hint: "90 is written as XC (100 - 10) and 4 is written as IV.",
        explanation: "94 = 90 + 4 = XC + IV = XCIV."
      }
    ],
    assertionReasons: [
      {
        id: "g6_ar1",
        assertion: "Assertion (A): The place value of 7 in the number 8,76,543 is 70,000.",
        reason: "Reason (R): The place value of a digit equals its face value multiplied by its position value in the place value chart.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Digit 7 is in the ten-thousands place, so place value = 7 × 10,000 = 70,000."
      },
      {
        id: "g6_ar2",
        assertion: "Assertion (A): 1 Million is equal to 10 Lakhs.",
        reason: "Reason (R): 1 Million in the International System is written as 1,000,000, which has 6 zeros, matching 10 Lakhs in the Indian System.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains the conversion between the two place value systems."
      },
      {
        id: "g6_ar3",
        assertion: "Assertion (A): The Roman numeral for 40 is written as XXXX.",
        reason: "Reason (R): In Roman numerals, a symbol cannot be repeated more than three times consecutively.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE because 40 is written as XL (50 - 10), not XXXX. Reason (R) is TRUE because Roman symbols cannot repeat more than 3 times."
      },
      {
        id: "g6_ar4",
        assertion: "Assertion (A): Rounding off 86 to the nearest tens gives 90.",
        reason: "Reason (R): When rounding to the nearest ten, if the digit at the ones place is 5 or greater, we round up to the next multiple of 10.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the exact mathematical rule for rounding up."
      },
      {
        id: "g6_ar5",
        assertion: "Assertion (A): Using brackets in 7 × (100 + 9) simplifies multiplication into smaller mental steps.",
        reason: "Reason (R): Brackets indicate that the enclosed operation should be evaluated first or expanded using the distributive law.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why brackets help simplify calculations."
      }
    ]
  },

  g9_numbersystems: {
    chapterId: "g9_numbersystems",
    chapterTitle: "Number Systems (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "Which of the following numbers is an irrational number?",
        options: ["A) √4", "B) 0.333...", "C) √2", "D) 22/7"],
        correctAnswer: "C",
        hint: "Irrational numbers cannot be expressed as p/q where p, q are integers.",
        explanation: "√2 = 1.41421356... is non-terminating non-recurring, making it irrational. √4 = 2 (rational)."
      },
      {
        id: "m2",
        question: "What is the simplified value of (3 + √3)(3 - √3)?",
        options: ["A) 6", "B) 9", "C) 12", "D) 0"],
        correctAnswer: "A",
        hint: "Use algebraic identity (a + b)(a - b) = a² - b².",
        explanation: "(3)² - (√3)² = 9 - 3 = 6."
      },
      {
        id: "m3",
        question: "What is the rationalizing factor of the denominator of 1 / (√7 - √6)?",
        options: ["A) √7 - √6", "B) √7 + √6", "C) 7 - 6", "D) 1/7"],
        correctAnswer: "B",
        hint: "Multiply numerator and denominator by conjugate (√a + √b).",
        explanation: "The conjugate of (√7 - √6) is (√7 + √6)."
      },
      {
        id: "m4",
        question: "Evaluate: (64)^(1/2).",
        options: ["A) 32", "B) 16", "C) 8", "D) 4"],
        correctAnswer: "C",
        hint: "(64)^(1/2) = √(64).",
        explanation: "8 × 8 = 64, so 64^(1/2) = 8."
      },
      {
        id: "m5",
        question: "The decimal expansion of an irrational number is always:",
        options: ["A) Terminating", "B) Non-terminating recurring", "C) Non-terminating non-recurring", "D) Finite"],
        correctAnswer: "C",
        hint: "Real numbers with non-repeating infinite decimals are irrational.",
        explanation: "By definition, irrational numbers have non-terminating and non-repeating decimal expansions."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): The number π (pi) is an irrational number, while 22/7 is a rational number.",
        reason: "Reason (R): 22/7 is an approximate rational representation of π, but π's exact value has non-terminating non-recurring decimals.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains the key mathematical distinction between π and 22/7."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): The sum of a rational number and an irrational number is always irrational.",
        reason: "Reason (R): Rational numbers are closed under addition.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "B",
        explanation: "Both statements are true facts, but Reason (R) about rational closure does not explain why adding irrational gives irrational."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): √9 is an irrational number.",
        reason: "Reason (R): Square roots of non-perfect square positive integers are irrational numbers.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because √9 = 3 (which is rational). Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Every integer is a rational number.",
        reason: "Reason (R): Any integer 'm' can be expressed in the form m/1 where denominator 1 ≠ 0.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly proves why integers belong to Q."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): (2^3) × (2^4) = 2^12.",
        reason: "Reason (R): According to exponent laws, a^m × a^n = a^(m+n).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because 2^3 × 2^4 = 2^(3+4) = 2^7 = 128 (not 2^12). Reason is TRUE."
      }
    ]
  },

  g9_polynomials: {
    chapterId: "g9_polynomials",
    chapterTitle: "Polynomials (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "What is the degree of the zero polynomial p(x) = 0?",
        options: ["A) 0", "B) 1", "C) Not defined", "D) Infinite"],
        correctAnswer: "C",
        hint: "The degree of a constant non-zero polynomial is 0, but for zero polynomial it is undefined.",
        explanation: "The degree of zero polynomial is conventionally not defined."
      },
      {
        id: "m2",
        question: "If (x - 1) is a factor of polynomial p(x) = x³ - 3x² + kx + 2, what is the value of k?",
        options: ["A) 0", "B) 1", "C) -1", "D) 2"],
        correctAnswer: "A",
        hint: "By Factor Theorem, if (x - 1) is a factor, then p(1) = 0.",
        explanation: "p(1) = (1)³ - 3(1)² + k(1) + 2 = 1 - 3 + k + 2 = k = 0."
      },
      {
        id: "m3",
        question: "Expand: (x + 2y + 3z)².",
        options: ["A) x² + 4y² + 9z²", "B) x² + 4y² + 9z² + 4xy + 12yz + 6zx", "C) x² + 2y² + 3z² + xy + yz + zx", "D) (x+y+z)³"],
        correctAnswer: "B",
        hint: "Identity: (a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ca.",
        explanation: "x² + 4y² + 9z² + 2(x)(2y) + 2(2y)(3z) + 2(3z)(x) = x² + 4y² + 9z² + 4xy + 12yz + 6zx."
      },
      {
        id: "m4",
        question: "What is the remainder when p(x) = x³ + 1 is divided by (x + 1)?",
        options: ["A) 0", "B) 1", "C) 2", "D) -1"],
        correctAnswer: "A",
        hint: "Use Remainder Theorem: Remainder = p(-1).",
        explanation: "p(-1) = (-1)³ + 1 = -1 + 1 = 0."
      },
      {
        id: "m5",
        question: "Which of the following expression is a polynomial in one variable?",
        options: ["A) 3√x + x", "B) x + 2/x", "C) x² + 5x + 7", "D) x^10 + y^3 + t^50"],
        correctAnswer: "C",
        hint: "Exponents of variables must be non-negative whole numbers.",
        explanation: "C has variable x with non-negative whole powers (2, 1, 0)."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Linear polynomial ax + b (a ≠ 0) has exactly one real zero.",
        reason: "Reason (R): The zero of linear polynomial ax + b is obtained by setting ax + b = 0 ➔ x = -b/a.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) directly proves the uniqueness of the zero."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): If x + y + z = 0, then x³ + y³ + z³ = 3xyz.",
        reason: "Reason (R): Identity states x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true. Substituting (x+y+z)=0 makes the right side zero, so x³+y³+z³ = 3xyz."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): 2x^(1/2) + 5 is a polynomial.",
        reason: "Reason (R): In a polynomial, all exponents of the variable must be non-negative integers.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because exponent 1/2 is fractional. Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): The degree of polynomial 5x⁴ - 3x² + 7 is 4.",
        reason: "Reason (R): The degree of a polynomial is the highest power of the variable in it.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Constant polynomial 7 has degree 1.",
        reason: "Reason (R): 7 can be written as 7x⁰.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE because 7 = 7x⁰ has degree 0 (not 1). Reason is TRUE."
      }
    ]
  },

  g9_coordinate: {
    chapterId: "g9_coordinate",
    chapterTitle: "Coordinate Geometry (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "In which quadrant does the point (-3, 5) lie?",
        options: ["A) Quadrant I", "B) Quadrant II", "C) Quadrant III", "D) Quadrant IV"],
        correctAnswer: "B",
        hint: "Q1: (+,+), Q2: (-,+), Q3: (-,-), Q4: (+,-).",
        explanation: "Abscissa x = -3 (negative) and Ordinate y = +5 (positive) lies in Quadrant II."
      },
      {
        id: "m2",
        question: "What are the coordinates of the Origin where X-axis and Y-axis intersect?",
        options: ["A) (1, 1)", "B) (0, 0)", "C) (0, 1)", "D) (1, 0)"],
        correctAnswer: "B",
        hint: "The starting reference point of the Cartesian plane.",
        explanation: "The origin is represented as (0, 0)."
      },
      {
        id: "m3",
        question: "Any point lying on the X-axis has its Y-coordinate (ordinate) equal to:",
        options: ["A) 1", "B) -1", "C) 0", "D) Any real number"],
        correctAnswer: "C",
        hint: "Points on X-axis have general form (x, 0).",
        explanation: "On the X-axis, the vertical distance y is always zero."
      },
      {
        id: "m4",
        question: "What is the x-coordinate of point P(-4, -7) called?",
        options: ["A) Ordinate", "B) Abscissa", "C) Quadrant", "D) Origin"],
        correctAnswer: "B",
        hint: "Horizontal distance = Abscissa; Vertical distance = Ordinate.",
        explanation: "The x-coordinate is called Abscissa (-4) and y-coordinate is Ordinate (-7)."
      },
      {
        id: "m5",
        question: "The perpendicular distance of the point (4, 3) from the Y-axis is:",
        options: ["A) 3 units", "B) 4 units", "C) 5 units", "D) 7 units"],
        correctAnswer: "B",
        hint: "Distance from Y-axis equals absolute x-coordinate |x|.",
        explanation: "Distance from Y-axis = |x| = 4 units."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Point A(0, -5) lies on the Y-axis.",
        reason: "Reason (R): For any point lying on the Y-axis, its abscissa (x-coordinate) is 0.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) is the exact criterion."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Point P(2, -3) and Q(-3, 2) represent the same location on the Cartesian plane.",
        reason: "Reason (R): Order of coordinates (x, y) matters in ordered pairs.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE (P is in Q4, Q is in Q2). Reason is TRUE."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Point (-4, -6) lies in Quadrant III.",
        reason: "Reason (R): In Quadrant III, both x-coordinate and y-coordinate are negative.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): The axes divide the Cartesian plane into four regions called quadrants.",
        reason: "Reason (R): The angle between X-axis and Y-axis is 90°.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "B",
        explanation: "Both are true mathematical facts, but 90° angle doesn't specify why regions are called quadrants (meaning fourths)."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Distance of point (5, 0) from origin is 5 units.",
        reason: "Reason (R): Distance of point (x, y) from origin (0, 0) is given by √(x² + y²).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true: √(5² + 0²) = 5."
      }
    ]
  },

  // ==========================================
  // SOCIAL SCIENCE CHAPTERS (GRADE 6 & GRADE 9)
  // ==========================================
  g6_soc_earliest_cities: {
    chapterId: "g6_soc_earliest_cities",
    chapterTitle: "Earliest Cities & Harappan Civilization",
    mcqs: [
      {
        id: "ec1",
        question: "Around how many years ago did the Harappan cities flourish along the Indus River valley?",
        options: ["A) 2500 years ago", "B) 3500 years ago", "C) 4700 years ago", "D) 7000 years ago"],
        correctAnswer: "C",
        hint: "Harappan civilization dates back to c. 2500 BCE (approx. 4,700 years before present).",
        explanation: "The Harappan cities developed about 4,700 years ago (c. 2500 BCE)."
      },
      {
        id: "ec2",
        question: "How were most Harappan cities spatially divided in terms of layout?",
        options: [
          "A) Into North, South, East, and West equal quadrants",
          "B) Into a smaller, higher Citadel in the west and a larger, lower Lower Town in the east",
          "C) Into circular rings surrounding a central palace",
          "D) Into three equal parallel strips"
        ],
        correctAnswer: "B",
        hint: "The elevated western part housed public structures, while the eastern part was residential.",
        explanation: "Harappan cities were divided into a smaller higher Citadel in the west and a larger lower Lower Town in the east."
      },
      {
        id: "ec3",
        question: "What material was used to make the Great Bath tank at Mohenjo-daro watertight?",
        options: ["A) Cement mortar", "B) Plastic coating", "C) Natural tar (bitumen) over plaster and baked bricks", "D) Animal fat"],
        correctAnswer: "C",
        hint: "A thick black layer of natural asphalt/tar.",
        explanation: "The Great Bath was lined with bricks, coated with plaster, and made watertight with a layer of natural tar (bitumen)."
      },
      {
        id: "ec4",
        question: "From where did the Harappans import Copper for making bronze tools and ornaments?",
        options: ["A) Karnataka & Ceylon", "B) Rajasthan & Oman", "C) Afghanistan & Iran", "D) Bengal & Assam"],
        correctAnswer: "B",
        hint: "Present-day western desert state in India and a country across the Arabian sea.",
        explanation: "Harappans obtained copper from present-day Rajasthan and from Oman in West Asia."
      },
      {
        id: "ec5",
        question: "Which unique Harappan site in Gujarat was divided into THREE fortified parts and yielded a massive white-stone inscription?",
        options: ["A) Lothal", "B) Kalibangan", "C) Dholavira", "D) Ropar"],
        correctAnswer: "C",
        hint: "Located in Khadir Beyt in the Rann of Kutch.",
        explanation: "Dholavira was uniquely divided into 3 parts with stone walls and contained a large Harappan white stone inscription."
      },
      {
        id: "ec6",
        question: "What remarkable structure was excavated at Lothal, proving its role as an international maritime trade port?",
        options: ["A) A royal palace", "B) A massive brick dockyard", "C) An amphitheatre", "D) A stone pyramid"],
        correctAnswer: "B",
        hint: "A water basin where boats and ships loaded and unloaded cargo from the sea.",
        explanation: "Lothal had a huge brick dockyard connected via a channel to the Sabarmati river for maritime sea trade."
      },
      {
        id: "ec7",
        question: "What stone was used by Harappans to make precise, standardized weights for measuring precious metals and stones?",
        options: ["A) Limestone", "B) Slate", "C) Chert stone", "D) Granite"],
        correctAnswer: "C",
        hint: "A fine-grained sedimentary rock, usually shaped into cubical weights.",
        explanation: "Harappan standardized weights were carefully carved out of Chert stone."
      },
      {
        id: "ec8",
        question: "Terracotta toy models found at Harappan sites prove that farmers used which tool for tilling soil?",
        options: ["A) Iron Ploughshare", "B) Wooden Plough", "C) Tractor", "D) Bronze Hoe"],
        correctAnswer: "B",
        hint: "Since wood decays over thousands of years, terracotta toy models provided the archaeological proof.",
        explanation: "Terracotta toy ploughs demonstrate that Harappan farmers used wooden ploughs to turn soil."
      }
    ],
    assertionReasons: [
      {
        id: "ec_ar1",
        assertion: "Assertion (A): The walls of Harappan houses and citadels remained standing for thousands of years.",
        reason: "Reason (R): Harappans used high-quality baked bricks laid in an interlocking pattern.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both Assertion and Reason are true, and the interlocking brick pattern correctly explains the durable strength of Harappan walls."
      },
      {
        id: "ec_ar2",
        assertion: "Assertion (A): Harappan street drainage systems were remarkably hygienic and well-maintained.",
        reason: "Reason (R): Street drains were completely open to sunlight and lacked inspection covers.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "C",
        explanation: "Assertion (A) is TRUE (Harappan drains were very hygienic). Reason (R) is FALSE because street drains were covered and had inspection holes at regular intervals for cleaning."
      },
      {
        id: "ec_ar3",
        assertion: "Assertion (A): Harappan steatite seals with clay impressions ('sealings') were essential for trade.",
        reason: "Reason (R): If the clay sealing on a bag was intact upon arrival, it proved the contents had not been tampered with.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains the functional security role of seals in Harappan commerce."
      }
    ]
  },

  g6_soc_maps: {
    chapterId: "g6_soc_maps",
    chapterTitle: "Maps and Directions",
    mcqs: [
      {
        id: "m1",
        question: "Which component of a map helps us calculate actual ground distance between two places?",
        options: ["A) Symbols", "B) Compass Rose", "C) Map Scale", "D) Key Legend"],
        correctAnswer: "C",
        hint: "Ratio between map distance and actual ground distance.",
        explanation: "Scale is the ratio of distance on map to actual distance on ground."
      },
      {
        id: "m2",
        question: "What are North, South, East, and West collectively known as?",
        options: ["A) Intermediate directions", "B) Cardinal points", "C) Grid lines", "D) Contour lines"],
        correctAnswer: "B",
        hint: "The four main primary directions.",
        explanation: "North, South, East, and West are called Cardinal directions."
      },
      {
        id: "m3",
        question: "A map showing physical natural features of Earth like mountains, rivers, and plains is called a:",
        options: ["A) Political map", "B) Physical / Relief map", "C) Thematic map", "D) Cadastral map"],
        correctAnswer: "B",
        hint: "Relief maps depict natural terrain.",
        explanation: "Physical or relief maps show landforms and water bodies."
      },
      {
        id: "m4",
        question: "What color is standardly used on maps to represent water bodies like oceans, seas, and lakes?",
        options: ["A) Green", "B) Brown", "C) Blue", "D) Yellow"],
        correctAnswer: "C",
        hint: "Standard conventional color code for water.",
        explanation: "Blue is universally used for water features on physical maps."
      },
      {
        id: "m5",
        question: "What is a rough drawing drawn without scale based on memory or spot observation called?",
        options: ["A) Plan", "B) Sketch", "C) Globe", "D) Atlas"],
        correctAnswer: "B",
        hint: "Unlike formal maps, this quick drawing lacks accurate scale.",
        explanation: "A sketch is a rough diagram drawn without scale."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): A small-scale map is used to show large areas like continents or countries on paper.",
        reason: "Reason (R): On small-scale maps, 1 cm may represent 500 km of ground distance.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains small scale mapping."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Maps are more convenient to carry and consult than a round 3D globe.",
        reason: "Reason (R): Maps can be folded, rolled, and printed in atlas books showing detailed local areas.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Political maps show distribution of rainfall, forests, and industries.",
        reason: "Reason (R): Maps focusing on specific information like climate or vegetation are called thematic maps.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE (Political maps show administrative boundaries of countries/states). Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): North-East (NE) is an intermediate direction.",
        reason: "Reason (R): NE lies halfway between North and East cardinal points.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Conventional symbols on maps use international agreements for colors and icons.",
        reason: "Reason (R): Universal symbols make maps easy to read and understand across different languages.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      }
    ]
  },

  g9_french_revolution: {
    chapterId: "g9_french_revolution",
    chapterTitle: "The French Revolution (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "The fortress-prison of Bastille was stormed by the citizens of Paris on:",
        options: ["A) 14 July 1789", "B) 4 August 1789", "C) 21 January 1793", "D) 18 Brumaire 1799"],
        correctAnswer: "A",
        hint: "This historic event marked the outbreak of the French Revolution.",
        explanation: "Storming of Bastille occurred on 14 July 1789."
      },
      {
        id: "m2",
        question: "Before 1789, French society was divided into how many Estates?",
        options: ["A) Two", "B) Three", "C) Four", "D) Five"],
        correctAnswer: "B",
        hint: "Clergy (1st), Nobility (2nd), Commoners (3rd).",
        explanation: "French society was divided into Three Estates."
      },
      {
        id: "m3",
        question: "Which tax was levied by the Catholic Church directly on French peasants (one-tenth of agricultural produce)?",
        options: ["A) Taille", "B) Tithe", "C) Manor duty", "D) Feudal dues"],
        correctAnswer: "B",
        hint: "Tithe was paid to Church; Taille was paid to the State.",
        explanation: "Tithe was the religious tax collected by the Church from peasants."
      },
      {
        id: "m4",
        question: "Who wrote the influential political pamphlet titled 'What is the Third Estate?'",
        options: ["A) Jean-Paul Marat", "B) Abbé Sieyès", "C) Montesquieu", "D) Voltaire"],
        correctAnswer: "B",
        hint: "A priest who championed the cause of the Third Estate.",
        explanation: "Abbé Sieyès authored 'What is the Third Estate?'."
      },
      {
        id: "m5",
        question: "The period from 1793 to 1794 in revolutionary France is known as the:",
        options: ["A) Directory Rule", "B) Reign of Terror under Robespierre", "C) Golden Age of Democracy", "D) Constitutional Monarchy"],
        correctAnswer: "B",
        hint: "Maximilien Robespierre executed opponents via guillotine.",
        explanation: "1793-1794 was the Reign of Terror under Robespierre's Jacobin regime."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Only the members of the Third Estate paid taxes in 18th century France.",
        reason: "Reason (R): The Clergy (First Estate) and Nobility (Second Estate) enjoyed exemption from paying taxes as a birth privilege.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why social inequality sparked the revolution."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): King Louis XVI called a meeting of the Estates General on 5 May 1789 to pass proposals for new taxes.",
        reason: "Reason (R): France faced severe financial crisis due to war debts and lavish court expenses at Versailles.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Olympe de Gouges supported the execution of women who demanded equal political rights.",
        reason: "Reason (R): She wrote the 'Declaration of the Rights of Woman and Citizen' in 1791.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE (Olympe de Gouges fought FOR women's rights and protested Robespierre's oppression). Reason is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Slavery was finally abolished in French colonies in 1848.",
        reason: "Reason (R): Napoleon Bonaparte re-introduced slavery in 1802.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are historical facts."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): The ideas of Liberty, Equality, and Fraternity were the most important legacy of the French Revolution.",
        reason: "Reason (R): These ideals inspired anti-colonial and democratic movements across Europe and Asia, including India.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      }
    ]
  },

  g9_democracy: {
    chapterId: "g9_democracy",
    chapterTitle: "What is Democracy? Why Democracy?",
    mcqs: [
      {
        id: "m1",
        question: "In a democracy, the final decision-making power must rest with:",
        options: ["A) The Military General", "B) Those elected by the people", "C) Hereditary Kings", "D) Wealthiest businessmen"],
        correctAnswer: "B",
        hint: "Democratic authority is derived directly from citizen votes.",
        explanation: "Primary feature of democracy: Representatives elected by citizens hold sovereign decision power."
      },
      {
        id: "m2",
        question: "Which of the following is NOT a core feature of a genuine democracy?",
        options: ["A) Free and fair elections", "B) One person, one vote, one value", "C) Rule of law and respect for rights", "D) Permanent rule by a single party"],
        correctAnswer: "D",
        hint: "Democracy requires political competition and choice.",
        explanation: "Single-party dictatorship suppresses choice, violating democratic principles."
      },
      {
        id: "m3",
        question: "In General Pervez Musharraf's Pakistan (1999), why was the regime classified as non-democratic?",
        options: ["A) Because no elections were held", "B) Because final executive power rested with military officers, not elected representatives", "C) Because Pakistan had no constitution", "D) Because economy failed"],
        correctAnswer: "B",
        hint: "Legal Framework Order allowed military president to dismiss elected assemblies.",
        explanation: "Power was centralized with military officials who were not elected by citizens."
      },
      {
        id: "m4",
        question: "What principle ensures political equality in elections?",
        options: ["A) Universal Adult Suffrage (One person, One vote, One value)", "B) Educational qualification voting", "C) Property ownership voting", "D) Gender-based voting"],
        correctAnswer: "A",
        hint: "Every adult citizen gets one vote of equal value.",
        explanation: "Universal Adult Suffrage guarantees political equality."
      },
      {
        id: "m5",
        question: "Why is democratic government considered a better form of government?",
        options: ["A) It makes decisions fastest without debate", "B) It is a more accountable form of government", "C) It never suffers economic poverty", "D) Leaders never change"],
        correctAnswer: "B",
        hint: "Elected leaders must respond to public needs or face election defeat.",
        explanation: "Democracy enhances accountability and allows correction of policy mistakes."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Democracy improves the quality of decision making.",
        reason: "Reason (R): Democratic decisions involve consultation, debate, and participation of many people.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains how widespread consultation reduces rash decisions."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): China's National People's Congress holds free democratic choice for citizens.",
        reason: "Reason (R): Candidates must be approved by the Chinese Communist Party before contesting elections.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE (lack of real political alternative makes it non-democratic). Reason is TRUE."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Democracy provides a method to deal with differences and conflicts peacefully.",
        reason: "Reason (R): In a diverse society like India, no single group can permanently dominate others under democratic rules.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Democracy guarantees that no bad decisions will ever be made.",
        reason: "Reason (R): Democracy allows public discussion and voting to correct wrong decisions over time.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion is FALSE (democracies can still make mistakes). Reason is TRUE."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): In Fiji, the vote of an indigenous Fijian has more value than that of an Indo-Fijian.",
        reason: "Reason (R): Electoral system in Fiji violates the democratic principle of 'one vote, one value'.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      }
    ]
  },

  g9_chem_inside_atom: {
    chapterId: "g9_chem_inside_atom",
    chapterTitle: "Journey Inside the Atom (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "Who discovered cathode rays and the negatively charged subatomic particle known as the electron?",
        options: ["A) Ernest Rutherford", "B) J.J. Thomson", "C) Niels Bohr", "D) James Chadwick"],
        correctAnswer: "B",
        hint: "He proposed the Plum Pudding (Watermelon) model of the atom.",
        explanation: "J.J. Thomson discovered the electron through cathode ray discharge tube experiments in 1897."
      },
      {
        id: "m2",
        question: "What was the main conclusion drawn from Rutherford's alpha (α) particle gold foil scattering experiment?",
        options: [
          "A) Atoms are solid, indivisible spheres with no internal space",
          "B) Most space in an atom is empty, and almost all mass is concentrated in a tiny central positive nucleus",
          "C) Electrons reside inside the nucleus alongside protons",
          "D) Protons move around the nucleus in fixed orbits"
        ],
        correctAnswer: "B",
        hint: "1 in 12,000 alpha particles rebounded at 180°, proving a dense nucleus exists.",
        explanation: "Because most α-particles passed undeflected, Rutherford concluded most of the atom is empty space, with a tiny, dense, positively charged nucleus."
      },
      {
        id: "m3",
        question: "According to the Bohr-Bury scheme, what is the maximum number of electrons that can be accommodated in the M shell (n = 3)?",
        options: ["A) 2", "B) 8", "C) 18", "D) 32"],
        correctAnswer: "C",
        hint: "Use the formula 2n² where n is the shell number.",
        explanation: "For M shell (n = 3), maximum electrons = 2 × (3)² = 2 × 9 = 18."
      },
      {
        id: "m4",
        question: "An element Sodium has atomic number Z = 11 and mass number A = 23. How many protons, neutrons, and electrons are in a neutral Sodium atom?",
        options: [
          "A) 11 Protons, 12 Neutrons, 11 Electrons",
          "B) 11 Protons, 23 Neutrons, 11 Electrons",
          "C) 12 Protons, 11 Neutrons, 12 Electrons",
          "D) 23 Protons, 11 Neutrons, 11 Electrons"
        ],
        correctAnswer: "A",
        hint: "Protons = Z, Electrons = Z, Neutrons = A - Z.",
        explanation: "Z = 11 -> Protons = 11, Electrons = 11. Neutrons = 23 - 11 = 12."
      },
      {
        id: "m5",
        question: "What is the valency of Oxygen (Atomic Number Z = 8)?",
        options: ["A) 6", "B) 8", "C) 2", "D) 4"],
        correctAnswer: "C",
        hint: "Electronic configuration of Oxygen is (2, 6). Valency = 8 - valence electrons.",
        explanation: "Oxygen has 6 valence electrons. To complete an octet (8), it gains 2 electrons, so Valency = 8 - 6 = 2."
      },
      {
        id: "m6",
        question: "Which subatomic particle has negligible mass and carries a unit negative electrical charge?",
        options: ["A) Proton", "B) Neutron", "C) Electron", "D) Alpha particle"],
        correctAnswer: "C",
        hint: "It revolves outside the nucleus in energy orbits.",
        explanation: "An electron carries a charge of -1.6 × 10⁻¹⁹ C and has a mass about 1/2000th of a proton."
      },
      {
        id: "m7",
        question: "Atoms of the same element having the same atomic number (Z) but different mass numbers (A) are called:",
        options: ["A) Isobars", "B) Isotopes", "C) Isotones", "D) Polymers"],
        correctAnswer: "B",
        hint: "Examples include Chlorine-35 and Chlorine-37.",
        explanation: "Isotopes are species of the same chemical element with identical atomic numbers but different neutron numbers (mass numbers)."
      },
      {
        id: "m8",
        question: "Which isotope is used in medicine for the treatment of goitre (disease of the thyroid gland)?",
        options: ["A) Cobalt-60", "B) Uranium-235", "C) Iodine-131", "D) Carbon-14"],
        correctAnswer: "C",
        hint: "Thyroid glands require this element to synthesize thyroxine.",
        explanation: "An isotope of Iodine (Iodine-131) is used in the medical diagnosis and treatment of goitre."
      },
      {
        id: "m9",
        question: "Calcium (₁₉Ca, A = 40) and Argon (₁₈Ar, A = 40) are classic examples of:",
        options: ["A) Isotopes", "B) Isobars", "C) Allotropes", "D) Isomers"],
        correctAnswer: "B",
        hint: "They belong to different elements but share the exact same mass number.",
        explanation: "Isobars are atoms of different elements having different atomic numbers but the same mass number."
      },
      {
        id: "m10",
        question: "Who discovered the neutral subatomic particle called the neutron in 1932?",
        options: ["A) J.J. Thomson", "B) E. Goldstein", "C) James Chadwick", "D) Niels Bohr"],
        correctAnswer: "C",
        hint: "This particle is present in the nucleus of all atoms except ordinary Hydrogen.",
        explanation: "James Chadwick discovered the neutron, a neutral subatomic particle present in atomic nuclei."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): An atom as a whole is electrically neutral.",
        reason: "Reason (R): In a neutral atom, the number of positively charged protons in the nucleus equals the number of negatively charged electrons in orbits.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains why positive and negative charges balance out."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Bohr's model resolved the instability issue of Rutherford's atomic model.",
        reason: "Reason (R): Bohr postulated that electrons revolve only in discrete stationary orbits without radiating energy.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the exact postulate that prevented atomic collapse."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Mass number of an atom is equal to the total number of protons and neutrons in its nucleus.",
        reason: "Reason (R): Electrons contribute significantly to the total mass of an atom.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "C",
        explanation: "Assertion (A) is TRUE, but Reason (R) is FALSE because electron mass is negligible compared to protons and neutrons."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Noble gases like Neon (Z=10) and Argon (Z=18) are chemically inert and show zero valency.",
        reason: "Reason (R): Their outermost energy shell is completely filled with a stable octet of 8 electrons.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why noble gases do not readily gain, lose, or share electrons."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Isotopes of an element exhibit identical chemical properties.",
        reason: "Reason (R): Chemical properties are determined by the electronic configuration and valence electrons, which are identical for all isotopes of an element.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) accurately explains why isotopes react identically in chemical reactions."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Neutrons are present in the nucleus of all atoms in nature.",
        reason: "Reason (R): Ordinary Hydrogen (Protium, ¹₁H) contains 1 proton, 1 electron, and 0 neutrons.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE because Protium (Hydrogen-1) has no neutrons. Reason (R) is TRUE."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): The average atomic mass of Chlorine is taken as 35.5 u.",
        reason: "Reason (R): Chlorine occurs in nature as two isotopes, ³⁵Cl and ³⁷Cl, in a 3:1 ratio of natural abundance.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains the weighted average calculation: (35×3 + 37×1)/4 = 35.5 u."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): Canal rays discovered by E. Goldstein led to the discovery of protons.",
        reason: "Reason (R): Canal rays are streams of positively charged radiation passing through a perforated cathode in a discharge tube.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) describes the nature of canal rays."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): The maximum capacity of the K shell is 8 electrons.",
        reason: "Reason (R): The maximum capacity of an electron shell is given by the formula 2n², where n is the shell principal quantum number.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE because K shell (n=1) capacity is 2(1)² = 2 electrons (not 8). Reason (R) is TRUE."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): Isobars have different chemical properties despite having the same mass number.",
        reason: "Reason (R): Isobars belong to different elements with different atomic numbers and different electronic configurations.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why Isobars behave differently in chemical reactions."
      }
    ]
  },

  g9_chem_matter: {
    chapterId: "g9_chem_matter",
    chapterTitle: "Matter in Our Surroundings (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "Which of the following conditions favors the liquefaction of a gas into liquid?",
        options: ["A) High temperature and low pressure", "B) Low temperature and high pressure", "C) High temperature and high pressure", "D) Low temperature and low pressure"],
        correctAnswer: "B",
        hint: "Cooling decreases kinetic energy while pressure brings particles close together.",
        explanation: "Applying high pressure brings gas particles closer, and lowering temperature reduces kinetic energy, converting gas to liquid."
      },
      {
        id: "m2",
        question: "What is the physical process of direct conversion of a solid into gas without passing through the liquid state?",
        options: ["A) Vaporization", "B) Sublimation", "C) Fusion", "D) Condensation"],
        correctAnswer: "B",
        hint: "Camphor, ammonium chloride, and dry ice undergo this process.",
        explanation: "Sublimation is the direct change of solid to gas without entering liquid state."
      },
      {
        id: "m3",
        question: "What is the SI unit of temperature?",
        options: ["A) Celsius (°C)", "B) Fahrenheit (°F)", "C) Kelvin (K)", "D) Pascal (Pa)"],
        correctAnswer: "C",
        hint: "0°C = 273.15 K.",
        explanation: "Kelvin (K) is the official SI unit of temperature."
      },
      {
        id: "m4",
        question: "Which of the following factors DECREASES the rate of evaporation of water?",
        options: ["A) Increase in surface area", "B) Increase in temperature", "C) Increase in humidity", "D) Increase in wind speed"],
        correctAnswer: "C",
        hint: "High moisture content in the surrounding air slows down evaporation.",
        explanation: "Humidity is the amount of water vapor in air. Higher humidity reduces the rate of evaporation."
      },
      {
        id: "m5",
        question: "Convert 300 K temperature into Celsius scale (°C):",
        options: ["A) 573 °C", "B) 27 °C", "C) 30 °C", "D) 100 °C"],
        correctAnswer: "B",
        hint: "Temperature in °C = Temperature in K - 273.",
        explanation: "300 - 273 = 27 °C."
      },
      {
        id: "m6",
        question: "Why does water kept in an earthen pot (matka) become cool during summer?",
        options: ["A) Osmosis", "B) Evaporation through micro-pores", "C) Condensation", "D) Sublimation"],
        correctAnswer: "B",
        hint: "Water seeping out through tiny pores absorbs latent heat of vaporization from the pot.",
        explanation: "Evaporation of water through earthen pot micro-pores takes latent heat from the pot, causing a cooling effect."
      },
      {
        id: "m7",
        question: "Which state of matter consists of super energetic and super excited particles in the form of ionized gases?",
        options: ["A) Solid", "B) Plasma", "C) Bose-Einstein Condensate", "D) Liquid"],
        correctAnswer: "B",
        hint: "This state is present in fluorescent tubes, neon sign bulbs, and stars.",
        explanation: "Plasma consists of ionized gas with free electrons and ions at super high temperatures."
      },
      {
        id: "m8",
        question: "What is the temperature at which ice melts into liquid water at atmospheric pressure called?",
        options: ["A) Boiling point (100°C)", "B) Melting point (0°C / 273 K)", "C) Critical point", "D) Flash point"],
        correctAnswer: "B",
        hint: "0°C corresponds to 273.15 K.",
        explanation: "The melting point of pure ice is 0°C (273.15 K)."
      },
      {
        id: "m9",
        question: "What is 'Dry Ice' chemically known as?",
        options: ["A) Solid Water", "B) Solid Carbon Dioxide (CO₂)", "C) Solid Nitrogen", "D) Liquid Ammonia"],
        correctAnswer: "B",
        hint: "It sublimates directly into gas when pressure drops to 1 atm.",
        explanation: "Solid Carbon Dioxide (CO₂) is known as dry ice because it does not melt into liquid."
      },
      {
        id: "m10",
        question: "Spreading of fragrance of an incense stick throughout a room is due to which physical phenomenon?",
        options: ["A) Osmosis", "B) Diffusion", "C) Sedimentation", "D) Transpiration"],
        correctAnswer: "B",
        hint: "Intermixing of particles of two different types of matter on their own.",
        explanation: "Diffusion is the spontaneous intermixing of gas particles driven by kinetic energy."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Sweating causes cooling of our body during hot summer days.",
        reason: "Reason (R): Evaporation absorbs latent heat of vaporization from the body surface, leading to cooling.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains the mechanism of evaporative cooling."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): Temperature remains constant during the melting of ice even though heat energy is continuously supplied.",
        reason: "Reason (R): The supplied heat energy is used up as latent heat of fusion to overcome forces of attraction between solid ice particles.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains latent heat of fusion."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Gases expand to completely fill the vessel in which they are kept.",
        reason: "Reason (R): Interparticle forces of attraction in gases are extremely weak and kinetic energy of gas particles is very high.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Solid CO₂ (Dry Ice) melts into liquid CO₂ at room temperature.",
        reason: "Reason (R): Solid CO₂ undergoes sublimation directly into gas when pressure drops to 1 atm.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (Dry Ice sublimates into gas, never melts into liquid at 1 atm). Reason (R) is TRUE."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Wet clothes dry faster on a windy sunny day than on a humid rainy day.",
        reason: "Reason (R): High wind speed and higher temperature increase the rate of evaporation, while high humidity decreases it.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Compressibility of liquids is much higher than that of gases.",
        reason: "Reason (R): Particles in liquids are tightly packed with negligible interparticle space compared to gases.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (gases are far more compressible than liquids). Reason (R) is TRUE."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): Water vapor at 100°C causes more severe burns than liquid boiling water at 100°C.",
        reason: "Reason (R): Steam contains extra hidden energy in the form of latent heat of vaporization.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): Diffusion becomes faster as temperature increases.",
        reason: "Reason (R): Increase in temperature increases the average kinetic energy and velocity of particles.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): 0°C on the Celsius scale equals 273.15 K on the Kelvin scale.",
        reason: "Reason (R): Kelvin is the SI unit of temperature.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): Sponge is considered a solid even though it can be easily compressed.",
        reason: "Reason (R): Sponge contains minute pores in which air is trapped; pressing it expels air out.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      }
    ]
  },

  g9_chem_atoms: {
    chapterId: "g9_chem_atoms",
    chapterTitle: "Atoms and Molecules (Grade 9)",
    mcqs: [
      {
        id: "m1",
        question: "Which law states that mass can neither be created nor destroyed in a chemical reaction?",
        options: ["A) Law of Constant Proportions", "B) Law of Conservation of Mass", "C) Law of Multiple Proportions", "D) Avogadro's Law"],
        correctAnswer: "B",
        hint: "Formulated by Antoine Lavoisier.",
        explanation: "The Law of Conservation of Mass states that total mass of products equals total mass of reactants in a chemical reaction."
      },
      {
        id: "m2",
        question: "In pure water (H₂O), what is the fixed ratio of mass of Hydrogen to mass of Oxygen?",
        options: ["A) 1 : 2", "B) 1 : 8", "C) 8 : 1", "D) 2 : 1"],
        correctAnswer: "B",
        hint: "Atomic mass of H = 1 u (2 H = 2 u); Atomic mass of O = 16 u. Ratio = 2:16.",
        explanation: "Mass ratio = 2 u : 16 u = 1 : 8, illustrating the Law of Constant Proportions."
      },
      {
        id: "m3",
        question: "What is the numerical value of Avogadro's Constant (N_A)?",
        options: ["A) 6.022 × 10²³", "B) 3.00 × 10⁸", "C) 1.6 × 10⁻¹⁹", "D) 9.8 × 10²⁴"],
        correctAnswer: "A",
        hint: "Number of elementary particles in 1 mole of any substance.",
        explanation: "Avogadro Constant N_A = 6.022 × 10²³ particles/mole."
      },
      {
        id: "m4",
        question: "What is the chemical formula of Aluminium Oxide?",
        options: ["A) AlO", "B) Al₂O₃", "C) Al₃O₂", "D) AlO₂"],
        correctAnswer: "B",
        hint: "Valency of Aluminium is +3 and Oxygen is -2.",
        explanation: "Using valency criss-cross: Al(+3) and O(-2) gives Al₂O₃."
      },
      {
        id: "m5",
        question: "Calculate the formula unit mass of Calcium Carbonate (CaCO₃) [Atomic masses: Ca=40 u, C=12 u, O=16 u]:",
        options: ["A) 50 u", "B) 100 u", "C) 84 u", "D) 120 u"],
        correctAnswer: "B",
        hint: "40 + 12 + (3 × 16).",
        explanation: "Mass = 40 + 12 + 48 = 100 u."
      },
      {
        id: "m6",
        question: "How many moles are present in 54 grams of pure Water (H₂O)? [Molar mass of H₂O = 18 g/mol]",
        options: ["A) 1 mole", "B) 2 moles", "C) 3 moles", "D) 4 moles"],
        correctAnswer: "C",
        hint: "Moles = Given Mass / Molar Mass.",
        explanation: "Moles = 54 / 18 = 3 moles."
      },
      {
        id: "m7",
        question: "Which reference isotope was universally chosen by IUPAC in 1961 as the standard for defining atomic mass unit (u)?",
        options: ["A) Hydrogen-1", "B) Oxygen-16", "C) Carbon-12", "D) Chlorine-35"],
        correctAnswer: "C",
        hint: "1 u = 1/12th the mass of one atom of this isotope.",
        explanation: "Carbon-12 isotope is the international standard reference for atomic mass units."
      },
      {
        id: "m8",
        question: "What is the atomicity of a Ozone molecule (O₃)?",
        options: ["A) Monoatomic (1)", "B) Diatomic (2)", "C) Triatomic (3)", "D) Tetra-atomic (4)"],
        correctAnswer: "C",
        hint: "Atomicity is the total number of atoms constituting a molecule.",
        explanation: "Ozone (O₃) consists of 3 Oxygen atoms, making it triatomic."
      },
      {
        id: "m9",
        question: "Which polyatomic ion carries a charge of -2 in Sodium Carbonate (Na₂CO₃)?",
        options: ["A) Ammonium (NH₄⁺)", "B) Carbonate (CO₃²⁻)", "C) Sulphate (SO₄²⁻)", "D) Nitrate (NO₃⁻)"],
        correctAnswer: "B",
        hint: "Formula CO₃ with net charge -2.",
        explanation: "Carbonate ion is CO₃²⁻."
      },
      {
        id: "m10",
        question: "Who proposed Dalton's Atomic Theory stating that all matter is composed of tiny indivisible particles called atoms?",
        options: ["A) John Dalton", "B) Ernest Rutherford", "C) Joseph Proust", "D) Antoine Lavoisier"],
        correctAnswer: "A",
        hint: "English chemist who published atomic theory in 1808.",
        explanation: "John Dalton presented his atomic theory in 1808."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): Mass of reactants is always equal to mass of products in a closed system chemical reaction.",
        reason: "Reason (R): According to the Law of Conservation of Mass, matter can neither be created nor destroyed during a chemical transformation.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains the Law of Conservation of Mass."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): One mole of Oxygen gas (O₂) and one mole of Nitrogen gas (N₂) contain the exact same number of molecules.",
        reason: "Reason (R): One mole of any substance contains Avogadro's number (6.022 × 10²³) of elementary particles.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) defines the mole concept."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): Chemical formula of Sodium Chloride is NaCl₂.",
        reason: "Reason (R): Sodium has valency +1 and Chlorine has valency -1.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (formula is NaCl, not NaCl₂). Reason (R) is TRUE."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): Pure water obtained from a river, rain, or lab always contains Hydrogen and Oxygen in 1:8 mass ratio.",
        reason: "Reason (R): According to the Law of Constant Proportions, a chemical compound always contains elements combined in definite proportions by mass.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): Atomic mass of Carbon is taken as 12 u.",
        reason: "Reason (R): One atomic mass unit (1 u) is defined as a mass equal to exactly 1/12th the mass of one Carbon-12 atom.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Argon and Helium exist as monoatomic molecules.",
        reason: "Reason (R): Noble gas atoms have complete valence shells and do not form chemical bonds with other atoms under ordinary conditions.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): Molar mass of Water (H₂O) is 18 grams/mole.",
        reason: "Reason (R): Molar mass is numerical equivalent of molecular mass expressed in grams.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): Polyatomic ions carry a net electrical charge.",
        reason: "Reason (R): Polyatomic ions are groups of covalently bonded atoms that have gained or lost electrons as a unit.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): Dalton's assumption that atoms are indivisible remains completely accurate today.",
        reason: "Reason (R): Discovery of subatomic particles (electrons, protons, neutrons) proved that atoms are divisible.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (Dalton's indivisible atom postulate was modified after discovering subatomic particles). Reason (R) is TRUE."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): 18g of Water (H₂O) and 44g of Carbon Dioxide (CO₂) both represent 1 mole of substance.",
        reason: "Reason (R): 1 mole equals the molar mass of a substance expressed in grams.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true."
      }
    ]
  },
  mensuration: {
    chapterId: "mensuration",
    chapterTitle: "Grade 6 Mathematics: Mensuration & Circumference of Circle",
    mcqs: [
      {
        id: "m1",
        question: "What is the specific mathematical term used for the perimeter (boundary length) of a circle?",
        options: ["A) Diameter", "B) Radius", "C) Circumference", "D) Sector"],
        correctAnswer: "C",
        hint: "The distance around the outside edge of a circular boundary.",
        explanation: "The perimeter or continuous outer boundary of a circle is called its Circumference."
      },
      {
        id: "m2",
        question: "Which constant ratio is obtained when the Circumference of ANY circle is divided by its Diameter?",
        options: ["A) Euler's number (e)", "B) Pi (π)", "C) Golden ratio (φ)", "D) Pythagoras constant"],
        correctAnswer: "B",
        hint: "Represented by the Greek letter π, approximately equal to 22/7 or 3.14.",
        explanation: "Circumference / Diameter = π (Pi) for all circles regardless of their size."
      },
      {
        id: "m3",
        question: "What is the correct formula to calculate the Circumference (C) of a circle with radius 'r'?",
        options: ["A) C = πr²", "B) C = 2πr", "C) C = 4πr", "D) C = πr/2"],
        correctAnswer: "B",
        hint: "Circumference equals 2 multiplied by π multiplied by radius.",
        explanation: "C = 2πr = πd (where d = 2r is diameter)."
      },
      {
        id: "m4",
        question: "A circular race track has a radius of 7 meters. Taking π = 22/7, what is its Circumference?",
        options: ["A) 22 meters", "B) 44 meters", "C) 88 meters", "D) 154 meters"],
        correctAnswer: "B",
        hint: "Use formula C = 2 × (22/7) × 7.",
        explanation: "C = 2 × (22/7) × 7 = 2 × 22 = 44 meters."
      },
      {
        id: "m5",
        question: "If the diameter of a circular bicycle wheel is 14 cm, what is its Circumference?",
        options: ["A) 22 cm", "B) 44 cm", "C) 88 cm", "D) 154 cm"],
        correctAnswer: "B",
        hint: "Formula C = π × d = (22/7) × 14.",
        explanation: "C = πd = (22/7) × 14 = 22 × 2 = 44 cm."
      },
      {
        id: "m6",
        question: "The circumference of a circular clock face is 132 cm. What is its radius? (Take π = 22/7)",
        options: ["A) 14 cm", "B) 21 cm", "C) 28 cm", "D) 42 cm"],
        correctAnswer: "B",
        hint: "2πr = 132 ⟹ r = (132 × 7) / (2 × 22).",
        explanation: "r = C / (2π) = (132 × 7) / 44 = 3 × 7 = 21 cm."
      },
      {
        id: "m7",
        question: "How far does a circular wheel of radius 21 cm travel in 100 complete revolutions? (Take π = 22/7)",
        options: ["A) 132 meters", "B) 13.2 meters", "C) 1320 meters", "D) 264 meters"],
        correctAnswer: "A",
        hint: "Distance in 1 revolution = C = 2 × (22/7) × 21 = 132 cm. Multiply by 100.",
        explanation: "C = 132 cm. Total distance = 100 × 132 cm = 13,200 cm = 132 meters."
      },
      {
        id: "m8",
        question: "What is the total PERIMETER of a SEMICIRCLE of radius 'r'?",
        options: ["A) πr", "B) 2πr", "C) πr + 2r", "D) πr + r"],
        correctAnswer: "C",
        hint: "Include both the curved half-arc (πr) AND the flat diameter baseline (2r).",
        explanation: "A semicircle boundary consists of half the circumference arc (πr) plus the straight diameter (2r), so Perimeter = πr + 2r = r(π + 2)."
      },
      {
        id: "m9",
        question: "Find the total perimeter of a semicircular protractor with radius 7 cm. (Take π = 22/7)",
        options: ["A) 22 cm", "B) 36 cm", "C) 44 cm", "D) 50 cm"],
        correctAnswer: "B",
        hint: "Arc length = (22/7) × 7 = 22 cm. Add diameter = 2 × 7 = 14 cm.",
        explanation: "Perimeter = πr + 2r = 22 + 14 = 36 cm."
      },
      {
        id: "m10",
        question: "A piece of wire 88 cm long is bent to form a circle. What is the radius of the circle formed?",
        options: ["A) 7 cm", "B) 14 cm", "C) 21 cm", "D) 28 cm"],
        correctAnswer: "B",
        hint: "Length of wire = Circumference C = 88 cm. Solve 2 × (22/7) × r = 88.",
        explanation: "2 × (22/7) × r = 88 ⟹ (44/7) × r = 88 ⟹ r = 88 × 7 / 44 = 14 cm."
      },
      {
        id: "m11",
        question: "If the radius of a circle is DOUBLED, what happens to its Circumference?",
        options: ["A) Remains same", "B) Doubled", "C) Quadrupled (4 times)", "D) Tripled"],
        correctAnswer: "B",
        hint: "Circumference C is directly proportional to radius r (C = 2πr).",
        explanation: "Since C = 2πr, doubling r multiplies C by 2."
      },
      {
        id: "m12",
        question: "If the ratio of radii of two circles is 3 : 5, what is the ratio of their circumferences?",
        options: ["A) 3 : 5", "B) 9 : 25", "C) 5 : 3", "D) 6 : 10"],
        correctAnswer: "A",
        hint: "C₁/C₂ = (2πr₁)/(2πr₂) = r₁/r₂.",
        explanation: "The ratio of circumferences is equal to the ratio of their radii (3 : 5)."
      },
      {
        id: "m13",
        question: "A wire in the shape of a square of side 11 cm is re-bent into a circle. What is the radius of the circle?",
        options: ["A) 3.5 cm", "B) 7 cm", "C) 14 cm", "D) 21 cm"],
        correctAnswer: "B",
        hint: "Total wire length = Perimeter of square = 4 × 11 = 44 cm. So 2πr = 44.",
        explanation: "Perimeter = 44 cm = Circumference = 2 × (22/7) × r ⟹ r = 7 cm."
      },
      {
        id: "m14",
        question: "How many revolutions will a wheel of radius 35 cm take to cover a total distance of 220 meters?",
        options: ["A) 50 revolutions", "B) 100 revolutions", "C) 200 revolutions", "D) 500 revolutions"],
        correctAnswer: "B",
        hint: "Total distance = 220 m = 22,000 cm. Circumference C = 2 × (22/7) × 35 = 220 cm. Revolutions = 22000 / 220.",
        explanation: "C = 220 cm. N = 22,000 cm / 220 cm = 100 revolutions."
      },
      {
        id: "m15",
        question: "Two concentric circles have radii 14 cm and 7 cm. What is the difference between their circumferences?",
        options: ["A) 22 cm", "B) 44 cm", "C) 88 cm", "D) 154 cm"],
        correctAnswer: "B",
        hint: "C₁ - C₂ = 2π(R - r) = 2 × (22/7) × (14 - 7).",
        explanation: "Difference = 2 × (22/7) × 7 = 44 cm."
      },
      {
        id: "m16",
        question: "Which of the following fractional approximations is most commonly used for Pi (π) in school mathematics?",
        options: ["A) 7/22", "B) 22/7", "C) 355/113", "D) 11/7"],
        correctAnswer: "B",
        hint: "The numerator is 22 and denominator is 7.",
        explanation: "π is approximated as 22/7 (or 3.14)."
      },
      {
        id: "m17",
        question: "What is the cost of fencing a circular park of radius 21 m at ₹10 per meter? (Take π = 22/7)",
        options: ["A) ₹1,320", "B) ₹2,640", "C) ₹13,860", "D) ₹660"],
        correctAnswer: "A",
        hint: "Fencing is along the perimeter = 2 × (22/7) × 21 = 132 m. Cost = 132 × 10.",
        explanation: "Circumference = 132 m. Total Cost = 132 × ₹10 = ₹1,320."
      },
      {
        id: "m18",
        question: "The minute hand of a wall clock is 10.5 cm long. How far does its tip travel in ONE FULL HOUR?",
        options: ["A) 33 cm", "B) 66 cm", "C) 132 cm", "D) 346.5 cm"],
        correctAnswer: "B",
        hint: "In 1 hour, the minute hand completes 1 full revolution (r = 10.5 cm = 21/2 cm).",
        explanation: "Distance = 2 × (22/7) × (21/2) = 66 cm."
      },
      {
        id: "m19",
        question: "A quarter circle (quadrant) has radius 'r'. What is its boundary perimeter formula?",
        options: ["A) πr/2", "B) πr/2 + 2r", "C) πr + 2r", "D) 2πr + r"],
        correctAnswer: "B",
        hint: "Arc length is 1/4 of 2πr = πr/2, plus two straight radius edges (2r).",
        explanation: "Perimeter of quadrant = (1/4 × 2πr) + r + r = (πr / 2) + 2r."
      },
      {
        id: "m20",
        question: "Find the perimeter of a quadrant (1/4 circle) of radius 7 cm. (Take π = 22/7)",
        options: ["A) 11 cm", "B) 25 cm", "C) 36 cm", "D) 44 cm"],
        correctAnswer: "B",
        hint: "Arc = (22/7 × 7)/2 = 11 cm. Add 2 radii = 11 + 7 + 7 = 25 cm.",
        explanation: "Perimeter = 11 cm (arc) + 14 cm (2 radii) = 25 cm."
      },
      {
        id: "m21",
        question: "What is the formula for the Perimeter of a Rectangle with length 'l' and breadth 'b'?",
        options: ["A) l × b", "B) 2(l + b)", "C) 4(l + b)", "D) l + b"],
        correctAnswer: "B",
        hint: "Sum of all four outer boundary sides: l + b + l + b.",
        explanation: "Perimeter of rectangle = 2(l + b)."
      },
      {
        id: "m22",
        question: "The length of a rectangular playground is 25 m and its breadth is 15 m. What is the length of wire needed to fence it twice?",
        options: ["A) 80 m", "B) 160 m", "C) 375 m", "D) 240 m"],
        correctAnswer: "B",
        hint: "1 round fence = P = 2(25 + 15) = 80 m. Double fence = 80 × 2.",
        explanation: "P = 80 m. Fencing twice = 2 × 80 = 160 meters."
      },
      {
        id: "m23",
        question: "If the perimeter of a regular hexagon is 36 cm, what is the length of each side?",
        options: ["A) 4 cm", "B) 6 cm", "C) 9 cm", "D) 12 cm"],
        correctAnswer: "B",
        hint: "A regular hexagon has 6 equal sides: 6 × Side = 36.",
        explanation: "Side = 36 ÷ 6 = 6 cm."
      },
      {
        id: "m24",
        question: "A square garden has a perimeter of 48 m. What is its Area?",
        options: ["A) 12 m²", "B) 96 m²", "C) 144 m²", "D) 196 m²"],
        correctAnswer: "C",
        hint: "Side = 48 ÷ 4 = 12 m. Area = Side × Side.",
        explanation: "Side = 12 m. Area = 12 × 12 = 144 sq m."
      },
      {
        id: "m25",
        question: "The ratio of circumferences of two circular rings is 4 : 9. What is the ratio of their AREAS?",
        options: ["A) 4 : 9", "B) 2 : 3", "C) 16 : 81", "D) 8 : 18"],
        correctAnswer: "C",
        hint: "Circumference ratio = radius ratio (r₁/r₂ = 4/9). Area ratio = (r₁/r₂)².",
        explanation: "Area ratio = (4/9)² = 16 : 81."
      }
    ],
    assertionReasons: [
      {
        id: "ar1",
        assertion: "Assertion (A): The perimeter of a circle is called its Circumference.",
        reason: "Reason (R): Circumference measures the total length of the continuous curved outer boundary line enclosing a circle.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) defines why the curved boundary length is termed Circumference."
      },
      {
        id: "ar2",
        assertion: "Assertion (A): The ratio of Circumference to Diameter is the same for a tiny coin and a huge planet.",
        reason: "Reason (R): For any circle, Circumference divided by Diameter is equal to the universal mathematical constant Pi (π).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains the universal constant property of Pi."
      },
      {
        id: "ar3",
        assertion: "Assertion (A): A circular wheel of radius 7 cm covers 44 cm distance in 1 complete revolution.",
        reason: "Reason (R): In one full turn, a wheel rolls forward by a distance equal to its Circumference (2πr = 2 × 22/7 × 7 = 44 cm).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) mathematically proves the rolling wheel distance rule."
      },
      {
        id: "ar4",
        assertion: "Assertion (A): The perimeter of a semicircle of radius 'r' is simply equal to πr.",
        reason: "Reason (R): A semicircle boundary consists ONLY of the curved arc of length πr.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (semicircle perimeter is πr + 2r including the flat diameter). Reason (R) is FALSE."
      },
      {
        id: "ar5",
        assertion: "Assertion (A): When a wire of fixed length is bent into a square and then re-bent into a circle, both shapes have the same perimeter.",
        reason: "Reason (R): Bending a wire does not alter its total length; hence the perimeter of the square equals the circumference of the circle.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains conservation of wire length."
      },
      {
        id: "ar6",
        assertion: "Assertion (A): Doubling the radius of a circle doubles its Circumference.",
        reason: "Reason (R): Circumference is directly proportional to radius according to the formula C = 2πr.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the mathematical direct proportionality."
      },
      {
        id: "ar7",
        assertion: "Assertion (A): Pi (π) is an exact rational fraction equal to 22/7.",
        reason: "Reason (R): 22/7 is an approximate rational representation commonly used for practical calculations.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (π is an irrational number; 22/7 is only an approximation). Reason (R) is TRUE."
      },
      {
        id: "ar8",
        assertion: "Assertion (A): If the radius of a circle is 14 cm, its diameter is 28 cm.",
        reason: "Reason (R): The diameter of any circle is twice its radius (d = 2r).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the direct relationship between diameter and radius."
      },
      {
        id: "ar9",
        assertion: "Assertion (A): The distance traveled by a rolling wheel in N revolutions is given by N × 2πr.",
        reason: "Reason (R): Each single revolution covers one circumference length 2πr.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly explains total distance calculation."
      },
      {
        id: "ar10",
        assertion: "Assertion (A): The unit of Circumference is measured in square centimeters (cm²).",
        reason: "Reason (R): Circumference represents a 1-dimensional linear boundary length, so its unit is centimeters (cm) or meters (m).",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (linear length is measured in cm, not cm²). Reason (R) is TRUE."
      },
      {
        id: "ar11",
        assertion: "Assertion (A): Two circles with equal circumferences must have equal radii.",
        reason: "Reason (R): Since C = 2πr, if C₁ = C₂, then 2πr₁ = 2πr₂ ⟹ r₁ = r₂.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) proves equality of radii from equal circumferences."
      },
      {
        id: "ar12",
        assertion: "Assertion (A): The area of a circle of radius 7 cm is equal to 154 cm².",
        reason: "Reason (R): Area of a circle formula is πr² = (22/7) × 7 × 7 = 154 cm².",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) proves the area calculation."
      },
      {
        id: "ar13",
        assertion: "Assertion (A): For two circles with radii in ratio 1 : 2, the ratio of their circumferences is 1 : 4.",
        reason: "Reason (R): Circumference depends on the square of the radius.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (ratio of circumferences is 1 : 2, not 1 : 4). Reason (R) is FALSE (circumference depends linearly on r)."
      },
      {
        id: "ar14",
        assertion: "Assertion (A): A quadrant of a circle has an arc length equal to half the circumference.",
        reason: "Reason (R): A quadrant represents one-fourth (1/4) of a circle, so its arc length is (1/4) × 2πr = πr/2.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (quadrant arc is 1/4 of circumference, not 1/2). Reason (R) is TRUE."
      },
      {
        id: "ar15",
        assertion: "Assertion (A): Fencing cost of a circular field depends on its circumference, whereas turfing (grass laying) cost depends on its area.",
        reason: "Reason (R): Fencing is done along the 1D boundary (perimeter), while turfing covers the 2D enclosed surface region.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) distinguishes boundary length from enclosed surface area."
      },
      {
        id: "ar16",
        assertion: "Assertion (A): The perimeter of a regular polygon with 'n' sides of length 's' is n × s.",
        reason: "Reason (R): Regular polygons have all sides equal in length.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains the regular polygon perimeter formula."
      },
      {
        id: "ar17",
        assertion: "Assertion (A): The perimeter of an equilateral triangle of side 8 cm is 24 cm.",
        reason: "Reason (R): Equilateral triangles have 3 equal sides, so Perimeter = 3 × 8 = 24 cm.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) gives the formula for equilateral triangle perimeter."
      },
      {
        id: "ar18",
        assertion: "Assertion (A): The minute hand of a clock traces a circular circumference as it moves.",
        reason: "Reason (R): The tip of the minute hand stays at a constant distance (length of hand) from the center clock axle.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) satisfies the geometric locus definition of a circle."
      },
      {
        id: "ar19",
        assertion: "Assertion (A): The area of a square of side 10 cm is equal to its perimeter.",
        reason: "Reason (R): Area = 10 × 10 = 100 cm², while Perimeter = 4 × 10 = 40 cm.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (100 cm² ≠ 40 cm). Reason (R) is TRUE."
      },
      {
        id: "ar20",
        assertion: "Assertion (A): Concentric circles share the same center point but have different radii.",
        reason: "Reason (R): The width of a circular track between two concentric circles equals R - r.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) defines the track width between concentric circles."
      },
      {
        id: "ar21",
        assertion: "Assertion (A): In a semicircle of radius 14 cm, the total perimeter is 72 cm.",
        reason: "Reason (R): Semicircle Perimeter = πr + 2r = (22/7 × 14) + (2 × 14) = 44 + 28 = 72 cm.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) correctly calculates the total perimeter."
      },
      {
        id: "ar22",
        assertion: "Assertion (A): The diameter of a circle is the longest chord of that circle.",
        reason: "Reason (R): Diameter passes directly through the center point O, making its length equal to 2r.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) explains why diameter is the maximal chord."
      },
      {
        id: "ar23",
        assertion: "Assertion (A): A circular arc is a straight line segment joining two points on a circle.",
        reason: "Reason (R): A chord is a straight line segment joining two boundary points, whereas an arc is a curved portion of the circle boundary.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: "Assertion (A) is FALSE (an arc is curved, not straight). Reason (R) is TRUE."
      },
      {
        id: "ar24",
        assertion: "Assertion (A): If the radius of a circle is 21 cm, its circumference is 132 cm.",
        reason: "Reason (R): C = 2 × (22/7) × 21 = 2 × 22 × 3 = 132 cm.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) proves the mathematical calculation."
      },
      {
        id: "ar25",
        assertion: "Assertion (A): Ancient Indian mathematician Aryabhata gave the value of Pi as 62832/20000 = 3.1416.",
        reason: "Reason (R): Aryabhata stated in Aryabhatiya that this value is an approximation for the ratio of circumference to diameter.",
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: "Both statements are true and Reason (R) highlights the historical mathematical achievement."
      }
    ]
  }
};

/**
 * Helper to clean topic title strings
 */
function cleanTopicName(topicTitle: string): string {
  return topicTitle
    .replace(/^(Step|Topic|Chapter|Lesson|Unit|Section)\s*\d+[:.-]?\s*/i, "")
    .replace(/^\d+[:.-]\s*/, "")
    .trim();
}

/**
 * Filter questions relevant to a topicTitle based on keyword matching
 */
function filterQuestionsForTopic<T extends { question?: string; assertion?: string; reason?: string; explanation?: string; hint?: string; options?: string[] }>(
  items: T[],
  topicTitle: string
): T[] {
  const cleanTopic = cleanTopicName(topicTitle).toLowerCase();
  const stopWords = new Set(["step", "topic", "chapter", "and", "the", "for", "with", "from", "into", "type", "types", "part", "parts", "step 1", "step 2", "step 3", "step 4", "step 5"]);
  
  const keywords = cleanTopic
    .split(/[\s,&()/+\-]+/)
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 2 && !stopWords.has(w));

  if (keywords.length === 0) return items;

  const matched = items.filter(item => {
    const text = [
      item.question || "",
      item.assertion || "",
      item.reason || "",
      item.explanation || "",
      item.hint || "",
      ...(item.options || [])
    ].join(" ").toLowerCase();

    return keywords.some(kw => text.includes(kw));
  });

  return matched;
}

/**
 * Helper to ensure a quiz has exactly targetCount MCQs and targetCount Assertion-Reasoning questions (default: 25 each).
 */
export function ensureTargetQuizCount(quiz: TopicQuizData, targetCount: number = 25, topicTitle?: string | null): TopicQuizData {
  const chapterId = quiz.chapterId;
  const cleanTitle = cleanTopicTitle(quiz.chapterTitle || quiz.chapterId);
  const cleanTopicStr = topicTitle ? cleanTopicName(topicTitle) : "";

  // 25 Clean Plain-Text & Unicode Mathematical/Scientific MCQ Templates
  const mcqTemplates: Array<(idx: number) => QuizQuestion> = [
    (i) => ({
      id: `m1_${chapterId}_${i}`,
      question: `If a quantity y varies directly as x according to y = kx, what happens to y when x is multiplied by 3?`,
      options: [
        `A) y is multiplied by 3`,
        `B) y is multiplied by 9`,
        `C) y remains unchanged`,
        `D) y is reduced to 1/3 of its initial value`
      ],
      correctAnswer: "A",
      hint: `Direct proportionality y = kx scales linearly with x.`,
      explanation: `Since y = kx, substituting 3x yields k(3x) = 3(kx) = 3y.`
    }),
    (i) => ({
      id: `m2_${chapterId}_${i}`,
      question: `For two quantities A and B satisfying A × B = k (where k is a constant), if A is reduced to 1/4 of its value, how does B change?`,
      options: [
        `A) B quadruples (multiplied by 4)`,
        `B) B decreases to 1/4 of its value`,
        `C) B increases by 2 units`,
        `D) B remains constant at k`
      ],
      correctAnswer: "A",
      hint: `In an inverse relationship A × B = k, the product stays constant.`,
      explanation: `(1/4 A) × (4 B) = A × B = k. Thus B quadruples.`
    }),
    (i) => ({
      id: `m3_${chapterId}_${i}`,
      question: `If a length measure increases by 10%, what is the percentage increase in its square area (kx²)?`,
      options: [
        `A) 21%`,
        `B) 20%`,
        `C) 10%`,
        `D) 100%`
      ],
      correctAnswer: "A",
      hint: `Calculate (1.10)².`,
      explanation: `(1.10)² = 1.21, which represents a 21% increase.`
    }),
    (i) => ({
      id: `m4_${chapterId}_${i}`,
      question: `On a linear coordinate graph, what does a constant positive slope represent?`,
      options: [
        `A) A constant rate of change of the dependent variable with respect to the independent variable`,
        `B) An exponential growth curve approaching infinity`,
        `C) Zero change in the output variable`,
        `D) An inverse non-linear decay relation`
      ],
      correctAnswer: "A",
      hint: `Slope measures rate of change Δy / Δx.`,
      explanation: `A constant slope indicates a constant rate of change between two linearly related quantities.`
    }),
    (i) => ({
      id: `m5_${chapterId}_${i}`,
      question: `In exponent expressions, what is the simplified form of (aᵐ × aⁿ) / aᵖ for a ≠ 0?`,
      options: [
        `A) aᵐ⁺ⁿ⁻ᵖ`,
        `B) a⁽ᵐⁿ⁾/ᵖ`,
        `C) aᵐ⁻ⁿ⁺ᵖ`,
        `D) aᵐ⁺ⁿ⁺ᵖ`
      ],
      correctAnswer: "A",
      hint: `Add powers during multiplication and subtract powers during division.`,
      explanation: `aᵐ × aⁿ = aᵐ⁺ⁿ, and dividing by aᵖ yields aᵐ⁺ⁿ⁻ᵖ.`
    }),
    (i) => ({
      id: `m6_${chapterId}_${i}`,
      question: `In a right-angled triangle, if the two perpendicular sides measure 6 cm and 8 cm, what is the length of the hypotenuse?`,
      options: [
        `A) 10 cm`,
        `B) 14 cm`,
        `C) 12 cm`,
        `D) 48 cm`
      ],
      correctAnswer: "A",
      hint: `Apply the Pythagorean theorem: c = √(a² + b²).`,
      explanation: `√(6² + 8²) = √(36 + 64) = √100 = 10 cm.`
    }),
    (i) => ({
      id: `m7_${chapterId}_${i}`,
      question: `What is the exact arithmetic mean of 5 observations: 12, 15, 18, 20, and 25?`,
      options: [
        `A) 18.0`,
        `B) 17.5`,
        `C) 19.0`,
        `D) 20.0`
      ],
      correctAnswer: "A",
      hint: `Sum the values and divide by 5.`,
      explanation: `(12 + 15 + 18 + 20 + 25) / 5 = 90 / 5 = 18.0.`
    }),
    (i) => ({
      id: `m8_${chapterId}_${i}`,
      question: `In a sample space of 8 equally likely outcomes, if Event E occurs in 3 outcomes, what is P(E'), the probability of the complementary event?`,
      options: [
        `A) 5/8`,
        `B) 3/8`,
        `C) 1/2`,
        `D) 1/8`
      ],
      correctAnswer: "A",
      hint: `Complementary probability P(E') = 1 − P(E).`,
      explanation: `P(E') = 1 − 3/8 = 5/8.`
    }),
    (i) => ({
      id: `m9_${chapterId}_${i}`,
      question: `What are the real roots of the quadratic equation x² − 7x + 12 = 0?`,
      options: [
        `A) x = 3 and x = 4`,
        `B) x = −3 and x = −4`,
        `C) x = 2 and x = 6`,
        `D) x = 1 and x = 12`
      ],
      correctAnswer: "A",
      hint: `Factor the quadratic as (x − a)(x − b) = 0.`,
      explanation: `(x − 3)(x − 4) = 0 ⇒ x = 3 or x = 4.`
    }),
    (i) => ({
      id: `m10_${chapterId}_${i}`,
      question: `In a system of simultaneous linear equations x + y = 15 and x − y = 3, what is the value of x?`,
      options: [
        `A) x = 9`,
        `B) x = 6`,
        `C) x = 12`,
        `D) x = 8`
      ],
      correctAnswer: "A",
      hint: `Add the two equations together to eliminate y.`,
      explanation: `(x + y) + (x − y) = 15 + 3 ⇒ 2x = 18 ⇒ x = 9.`
    }),
    (i) => ({
      id: `m11_${chapterId}_${i}`,
      question: `If the radius of a circle is doubled from r to 2r, by what factor does its enclosed area increase?`,
      options: [
        `A) 4`,
        `B) 2`,
        `C) 8`,
        `D) 16`
      ],
      correctAnswer: "A",
      hint: `Area A = π r².`,
      explanation: `π (2r)² = 4 π r², which is 4 times the original area.`
    }),
    (i) => ({
      id: `m12_${chapterId}_${i}`,
      question: `Which of the following numbers is an irrational number?`,
      options: [
        `A) √2`,
        `B) 0.75`,
        `C) 22/7`,
        `D) √16`
      ],
      correctAnswer: "A",
      hint: `Irrational numbers cannot be written as p/q for integers p, q.`,
      explanation: `√2 is non-terminating and non-repeating, so it is irrational.`
    }),
    (i) => ({
      id: `m13_${chapterId}_${i}`,
      question: `What is the degree of the polynomial expression P(x) = 4x⁵ − 3x³ + 7x² − 12?`,
      options: [
        `A) 5`,
        `B) 3`,
        `C) 4`,
        `D) 10`
      ],
      correctAnswer: "A",
      hint: `The degree is the highest power of x.`,
      explanation: `The term with the highest power is 4x⁵, so the degree is 5.`
    }),
    (i) => ({
      id: `m14_${chapterId}_${i}`,
      question: `In an Arithmetic Progression (AP) with first term a = 4 and common difference d = 3, what is the 10th term a₁₀?`,
      options: [
        `A) 31`,
        `B) 34`,
        `C) 30`,
        `D) 28`
      ],
      correctAnswer: "A",
      hint: `Formula: aₙ = a + (n − 1)d.`,
      explanation: `a₁₀ = 4 + (10 − 1) × 3 = 4 + 27 = 31.`
    }),
    (i) => ({
      id: `m15_${chapterId}_${i}`,
      question: `In a triangle, two interior angles measure 55° and 65°. What is the measure of the third interior angle?`,
      options: [
        `A) 60°`,
        `B) 50°`,
        `C) 70°`,
        `D) 90°`
      ],
      correctAnswer: "A",
      hint: `The sum of interior angles in a triangle is 180°.`,
      explanation: `180° − (55° + 65°) = 180° − 120° = 60°.`
    }),
    (i) => ({
      id: `m16_${chapterId}_${i}`,
      question: `What is the total perimeter of a rectangle with length l = 14 cm and width w = 8 cm?`,
      options: [
        `A) 44 cm`,
        `B) 112 cm²`,
        `C) 22 cm`,
        `D) 56 cm`
      ],
      correctAnswer: "A",
      hint: `Perimeter P = 2(l + w).`,
      explanation: `P = 2(14 + 8) = 2(22) = 44 cm.`
    }),
    (i) => ({
      id: `m17_${chapterId}_${i}`,
      question: `What is the decimal representation of the rational fraction 7/8?`,
      options: [
        `A) 0.875`,
        `B) 0.780`,
        `C) 0.850`,
        `D) 0.708`
      ],
      correctAnswer: "A",
      hint: `Perform long division 7 ÷ 8.`,
      explanation: `7 ÷ 8 = 0.875.`
    }),
    (i) => ({
      id: `m18_${chapterId}_${i}`,
      question: `What is the value of log₁₀(1000)?`,
      options: [
        `A) 3`,
        `B) 10`,
        `C) 100`,
        `D) 30`
      ],
      correctAnswer: "A",
      hint: `Determine the exponent k such that 10ᵏ = 1000.`,
      explanation: `Since 10³ = 1000, log₁₀(1000) = 3.`
    }),
    (i) => ({
      id: `m19_${chapterId}_${i}`,
      question: `In a right triangle, if sin(θ) = 3/5, what is cos(θ) for acute angle θ?`,
      options: [
        `A) 4/5`,
        `B) 3/4`,
        `C) 5/4`,
        `D) 5/3`
      ],
      correctAnswer: "A",
      hint: `Use sin²(θ) + cos²(θ) = 1.`,
      explanation: `cos(θ) = √(1 − (3/5)²) = √(16/25) = 4/5.`
    }),
    (i) => ({
      id: `m20_${chapterId}_${i}`,
      question: `Which of the following physical quantities is strictly a scalar quantity?`,
      options: [
        `A) Speed`,
        `B) Velocity`,
        `C) Acceleration`,
        `D) Displacement`
      ],
      correctAnswer: "A",
      hint: `Scalar quantities have magnitude only, without direction.`,
      explanation: `Speed is a scalar quantity because it has magnitude only.`
    }),
    (i) => ({
      id: `m21_${chapterId}_${i}`,
      question: `Given the algebraic function f(x) = 2x² − 3x + 5, what is f(−2)?`,
      options: [
        `A) 19`,
        `B) 7`,
        `C) 3`,
        `D) 15`
      ],
      correctAnswer: "A",
      hint: `Substitute x = −2 into the expression.`,
      explanation: `f(−2) = 2(−2)² − 3(−2) + 5 = 2(4) + 6 + 5 = 19.`
    }),
    (i) => ({
      id: `m22_${chapterId}_${i}`,
      question: `When two parallel lines are cut by a transversal, if one alternate interior angle measures 72°, what is the measure of the other alternate interior angle?`,
      options: [
        `A) 72°`,
        `B) 108°`,
        `C) 180°`,
        `D) 36°`
      ],
      correctAnswer: "A",
      hint: `Alternate interior angles between parallel lines are equal.`,
      explanation: `Alternate interior angles formed by a transversal with parallel lines are equal (72°).`
    }),
    (i) => ({
      id: `m23_${chapterId}_${i}`,
      question: `For the numerical dataset {4, 9, 15, 23, 31, 42}, what is the statistical range?`,
      options: [
        `A) 38`,
        `B) 42`,
        `C) 21`,
        `D) 37`
      ],
      correctAnswer: "A",
      hint: `Range = Maximum value − Minimum value.`,
      explanation: `42 − 4 = 38.`
    }),
    (i) => ({
      id: `m24_${chapterId}_${i}`,
      question: `An object travels at a uniform speed of 18 m/s for 20 seconds. What is the total distance traversed?`,
      options: [
        `A) 360 m`,
        `B) 180 m`,
        `C) 0.9 m`,
        `D) 720 m`
      ],
      correctAnswer: "A",
      hint: `Distance = Speed × Time.`,
      explanation: `18 × 20 = 360 m.`
    }),
    (i) => ({
      id: `m25_${chapterId}_${i}`,
      question: `What is the prime factorization of 180?`,
      options: [
        `A) 2² × 3² × 5`,
        `B) 2 × 3³ × 5`,
        `C) 2³ × 3 × 5`,
        `D) 4 × 9 × 5`
      ],
      correctAnswer: "A",
      hint: `Break down into prime factors: 2, 3, 5.`,
      explanation: `180 = 4 × 9 × 5 = 2² × 3² × 5.`
    })
  ];

  // 25 Clean Plain-Text Assertion-Reason Templates
  const arTemplates: Array<(idx: number) => AssertionReasonQuestion> = [
    (i) => ({
      id: `ar1_${chapterId}_${i}`,
      assertion: `Assertion (A): If the slope m of a linear function y = mx + c is positive, y increases as x increases.`,
      reason: `Reason (R): The slope of a line represents the rate of change Δy / Δx, so m > 0 implies a positive change in y for a positive change in x.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) is the correct mathematical explanation of Assertion (A).`
    }),
    (i) => ({
      id: `ar2_${chapterId}_${i}`,
      assertion: `Assertion (A): The quadratic equation x² + 4x + 5 = 0 has no real roots.`,
      reason: `Reason (R): The discriminant D = b² − 4ac = 16 − 20 = −4 is strictly less than zero (D < 0).`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) correctly explains why there are no real roots.`
    }),
    (i) => ({
      id: `ar3_${chapterId}_${i}`,
      assertion: `Assertion (A): For any non-zero real number a, a⁰ = 1.`,
      reason: `Reason (R): Dividing aⁿ by aⁿ yields aⁿ⁻ⁿ = a⁰, and any non-zero quantity divided by itself equals 1.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) gives the mathematical derivation for a⁰ = 1.`
    }),
    (i) => ({
      id: `ar4_${chapterId}_${i}`,
      assertion: `Assertion (A): For any acute angle θ in trigonometry, sin²(θ) + cos²(θ) = 1.`,
      reason: `Reason (R): This identity is derived directly from applying the Pythagorean theorem (a² + b² = c²) to a right triangle.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) is the correct explanation.`
    }),
    (i) => ({
      id: `ar5_${chapterId}_${i}`,
      assertion: `Assertion (A): Opposite sides of a parallelogram are equal in length.`,
      reason: `Reason (R): The sum of all four interior angles in any quadrilateral is 360°.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "B",
      explanation: `Both statements are true, but Reason (R) is a general quadrilateral angle property and NOT the explanation for why opposite sides are equal.`
    }),
    (i) => ({
      id: `ar6_${chapterId}_${i}`,
      assertion: `Assertion (A): If y is inversely proportional to x, then doubling x reduces y to half its value.`,
      reason: `Reason (R): In inverse variation, the product k = x × y remains constant for all non-zero pairs.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) correctly explains the inverse relationship.`
    }),
    (i) => ({
      id: `ar7_${chapterId}_${i}`,
      assertion: `Assertion (A): The integer 2 is the only even prime number in number theory.`,
      reason: `Reason (R): Every even integer greater than 2 has at least three distinct factors: 1, 2, and itself, making it composite.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) accurately explains why no other even number can be prime.`
    }),
    (i) => ({
      id: `ar8_${chapterId}_${i}`,
      assertion: `Assertion (A): If two triangles are similar with a scale factor of 3:1, the ratio of their areas is 9:1.`,
      reason: `Reason (R): The ratio of the areas of two similar triangles is equal to the square of the ratio of their corresponding sides.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) correctly provides the theorem.`
    }),
    (i) => ({
      id: `ar9_${chapterId}_${i}`,
      assertion: `Assertion (A): Division of any real number a ≠ 0 by 0 is undefined in standard arithmetic.`,
      reason: `Reason (R): If a / 0 = k, then k × 0 must equal a, which is impossible for a ≠ 0 because k × 0 = 0.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) demonstrates why division by zero cannot yield a valid real number.`
    }),
    (i) => ({
      id: `ar10_${chapterId}_${i}`,
      assertion: `Assertion (A): The angle subtended by a circular arc at the center is double the angle subtended at any point on the remaining circumference.`,
      reason: `Reason (R): Radii drawn to the ends of a chord form isosceles triangles with equal base angles.`,
      options: STANDARD_AR_OPTIONS,
      correctAnswer: "A",
      explanation: `Both statements are true and Reason (R) provides the geometric basis used in proving the Central Angle Theorem.`
    })
  ];

  const currentMcqs = [...quiz.mcqs];
  const currentArs = [...quiz.assertionReasons];

  // Pad MCQs up to targetCount (25)
  while (currentMcqs.length < targetCount) {
    const nextIdx = currentMcqs.length;
    if (cleanTopicStr) {
      currentMcqs.push({
        id: `mcq_topic_${nextIdx}_${chapterId}`,
        question: `Regarding "${cleanTopicStr}" in ${cleanTitle}, which of the following is correct?`,
        options: [
          `A) It provides a fundamental rule for evaluating problems in ${cleanTopicStr}`,
          `B) It is only applicable when the numerical result is zero`,
          `C) It contradicts standard mathematical definitions in ${cleanTitle}`,
          `D) It applies exclusively to even prime numbers`
        ],
        correctAnswer: "A",
        hint: `Recall the main definition and key steps for ${cleanTopicStr}.`,
        explanation: `Understanding ${cleanTopicStr} gives a structured approach to solving relevant problems accurately in ${cleanTitle}.`
      });
    } else {
      const templateFn = mcqTemplates[nextIdx % mcqTemplates.length];
      currentMcqs.push(templateFn(nextIdx + 1));
    }
  }

  // Pad Assertion-Reasoning up to targetCount (25)
  while (currentArs.length < targetCount) {
    const nextIdx = currentArs.length;
    if (cleanTopicStr) {
      currentArs.push({
        id: `ar_topic_${nextIdx}_${chapterId}`,
        assertion: `Assertion (A): Mastering "${cleanTopicStr}" is essential when studying ${cleanTitle}.`,
        reason: `Reason (R): Concept rules in "${cleanTopicStr}" provide the mathematical basis for calculations in ${cleanTitle}.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        hint: `Consider why ${cleanTopicStr} is a key concept in ${cleanTitle}.`,
        explanation: `Both Assertion (A) and Reason (R) are true, and Reason (R) is the correct explanation.`
      });
    } else {
      const templateFn = arTemplates[nextIdx % arTemplates.length];
      currentArs.push(templateFn(nextIdx + 1));
    }
  }

  // =========================================================
  // SUBJECT-ACCURATE 2-MARK SHORT QUESTION GENERATOR
  // Zero Placeholder Text | Substantive Content | Grade 6 & 9 Level
  // =========================================================
  const domain = detectSubjectDomain(chapterId, cleanTitle, cleanTopicStr);
  const currentSqs: ShortQuestion[] = [...(quiz.shortQuestions || [])];
  const targetSqCount = Math.min(targetCount, 15);

  const domainQuestionPool = getDomainShortQuestionPool(domain, chapterId, cleanTitle, cleanTopicStr);

  while (currentSqs.length < targetSqCount) {
    const nextIdx = currentSqs.length;
    const poolItem = domainQuestionPool[nextIdx % domainQuestionPool.length];
    currentSqs.push({
      id: `sq_${domain.toLowerCase()}_${nextIdx}_${chapterId}`,
      question: poolItem.question,
      answer: poolItem.answer,
      explanation: poolItem.explanation,
      hint: poolItem.hint
    });
  }

  return {
    chapterId,
    chapterTitle: cleanTitle,
    mcqs: currentMcqs.slice(0, targetCount).map(q => ({
      ...q,
      question: formatMathText(q.question),
      options: q.options.map(opt => formatMathText(opt)),
      hint: formatMathText(q.hint),
      explanation: formatMathText(q.explanation)
    })),
    assertionReasons: currentArs.slice(0, targetCount).map(q => ({
      ...q,
      assertion: formatMathText(q.assertion),
      reason: formatMathText(q.reason),
      options: q.options.map(opt => formatMathText(opt)),
      hint: q.hint ? formatMathText(q.hint) : undefined,
      explanation: formatMathText(q.explanation)
    })),
    shortQuestions: currentSqs.slice(0, targetSqCount).map(q => ({
      ...q,
      question: formatMathText(q.question),
      answer: formatMathText(q.answer),
      explanation: formatMathText(q.explanation),
      hint: q.hint ? formatMathText(q.hint) : undefined
    }))
  };
}

/**
 * Helper to retrieve or dynamically generate 25 MCQs + 25 Assertion-Reasoning questions
 * for any given topic/chapter ID or Title!
 */
export function getTopicQuiz(
  chapterId: string,
  chapterTitle?: string,
  topicTitle?: string | null
): TopicQuizData {
  let baseQuiz: TopicQuizData | undefined;

  const cleanId = (chapterId || "").toLowerCase();
  const cleanTitleStr = (chapterTitle || "").toLowerCase();

  if (TOPIC_QUIZZES[chapterId]) {
    baseQuiz = TOPIC_QUIZZES[chapterId];
  } else if (cleanId.includes("fraction") || cleanTitleStr.includes("fraction")) {
    baseQuiz = TOPIC_QUIZZES["fractions"];
  }

  if (!baseQuiz) {
    // Fallback / Generator for any chapter not in static dictionary
    const title = cleanTopicTitle(chapterTitle || chapterId);
    baseQuiz = {
      chapterId,
      chapterTitle: title,
      mcqs: [],
      assertionReasons: [],
      shortQuestions: []
    };
  }

  // If a specific topicTitle is provided, filter/adapt questions for that topic!
  if (topicTitle) {
    const matchedMcqs = filterQuestionsForTopic(baseQuiz.mcqs, topicTitle);
    const matchedArs = filterQuestionsForTopic(baseQuiz.assertionReasons, topicTitle);
    const matchedSqs = filterQuestionsForTopic(baseQuiz.shortQuestions || [], topicTitle);

    const topicQuiz: TopicQuizData = {
      chapterId: baseQuiz.chapterId,
      chapterTitle: `${cleanTopicTitle(chapterTitle || chapterId)} - ${cleanTopicName(topicTitle)}`,
      mcqs: matchedMcqs.length > 0 ? matchedMcqs : baseQuiz.mcqs,
      assertionReasons: matchedArs.length > 0 ? matchedArs : baseQuiz.assertionReasons,
      shortQuestions: matchedSqs.length > 0 ? matchedSqs : (baseQuiz.shortQuestions || [])
    };

    return ensureTargetQuizCount(topicQuiz, 25, topicTitle);
  }

  // Entire chapter quiz
  return ensureTargetQuizCount(baseQuiz, 25);
}

// =========================================================
// DOMAIN DETECTOR & ZERO-PLACEHOLDER SHORT QUESTION POOLS
// =========================================================
export type SubjectDomain =
  | "MAGNETS"
  | "LIGHT"
  | "ELECTRICITY"
  | "MOTION"
  | "FOOD_NUTRITION"
  | "SUBSTANCES_CHEM"
  | "PLANTS_BOTANY"
  | "BODY_ANIMALS"
  | "LIVING_HABITAT"
  | "FRACTIONS"
  | "DECIMALS"
  | "INTEGERS"
  | "ALGEBRA"
  | "GEOMETRY"
  | "MENSURATION"
  | "NUMBERS"
  | "GENERAL_SCIENCE"
  | "GENERAL_MATH";

export function detectSubjectDomain(chapterId: string, chapterTitle: string, topicTitle?: string | null): SubjectDomain {
  const text = `${chapterId} ${chapterTitle} ${topicTitle || ""}`.toLowerCase();

  if (text.includes("magnet")) return "MAGNETS";
  if (text.includes("light") || text.includes("shadow") || text.includes("reflection") || text.includes("pinhole")) return "LIGHT";
  if (text.includes("electric") || text.includes("circuit") || text.includes("conductor") || text.includes("cell") || text.includes("switch")) return "ELECTRICITY";
  if (text.includes("motion") || text.includes("distance") || text.includes("measurement") || text.includes("speed")) return "MOTION";
  if (text.includes("food") || text.includes("nutrition") || text.includes("component") || text.includes("diet") || text.includes("vitamin")) return "FOOD_NUTRITION";
  if (text.includes("substance") || text.includes("sorting") || text.includes("material") || text.includes("separation") || text.includes("change")) return "SUBSTANCES_CHEM";
  if (text.includes("plant") || text.includes("leaf") || text.includes("root") || text.includes("flower") || text.includes("photosynthe")) return "PLANTS_BOTANY";
  if (text.includes("body") || text.includes("movement") || text.includes("joint") || text.includes("bone") || text.includes("skeleton") || text.includes("muscle")) return "BODY_ANIMALS";
  if (text.includes("living") || text.includes("organism") || text.includes("habitat") || text.includes("adapt")) return "LIVING_HABITAT";

  if (text.includes("fraction")) return "FRACTIONS";
  if (text.includes("decimal")) return "DECIMALS";
  if (text.includes("integer")) return "INTEGERS";
  if (text.includes("algebra") || text.includes("equation") || text.includes("variable")) return "ALGEBRA";
  if (text.includes("geometr") || text.includes("shape") || text.includes("angle") || text.includes("point") || text.includes("line")) return "GEOMETRY";
  if (text.includes("mensuration") || text.includes("perimeter") || text.includes("area")) return "MENSURATION";
  if (text.includes("number") || text.includes("count") || text.includes("factor") || text.includes("multiple") || text.includes("hcf") || text.includes("lcm")) return "NUMBERS";

  if (text.includes("sci") || text.includes("phys") || text.includes("chem") || text.includes("bio")) return "GENERAL_SCIENCE";
  return "GENERAL_MATH";
}

export function getDomainShortQuestionPool(
  domain: SubjectDomain,
  chapterId: string,
  chapterTitle: string,
  topicTitle?: string | null
): Array<{ question: string; answer: string; explanation: string; hint?: string }> {
  const cleanTop = (topicTitle || "").toLowerCase();

  switch (domain) {
    case "MAGNETS":
      if (cleanTop.includes("compass")) {
        return [
          {
            question: "How does a magnetic compass work to assist navigators in identifying North and South directions?",
            answer: "A magnetic compass contains a lightweight magnetized needle resting on a pivot. The needle aligns itself along Earth's magnetic North-South direction.",
            explanation: "Step 1: The compass needle is a small permanent magnet balanced on a low-friction pivot.\nStep 2: Earth's magnetic field exerts a rotational force (torque) aligning the needle along the North-South axis.\nStep 3: Once the North pole of the needle points North, navigators can easily read East, West, and South from the dial.",
            hint: "Earth acts as a giant natural magnet aligning the compass needle."
          },
          {
            question: "State two precautions to take when using or storing a magnetic compass near electrical equipment.",
            answer: "Keep the compass away from strong magnets, electrical wires, and iron objects, as foreign magnetic fields cause temporary navigational deviation errors.",
            explanation: "Step 1: Nearby magnetic materials or electric currents produce external magnetic fields.\nStep 2: These external fields override Earth's weak magnetic field, pulling the needle away from true North.\nStep 3: Removing external magnetic sources restores accurate North-South directional alignment.",
            hint: "External magnetic fields distort compass readings."
          }
        ];
      }
      return [
        {
          question: "What are magnetic materials? State two examples of magnetic materials and two examples of non-magnetic materials.",
          answer: "Magnetic materials are materials attracted by a magnet (e.g., Iron, Steel). Non-magnetic materials are not attracted by a magnet (e.g., Wood, Plastic).",
          explanation: "Step 1: Magnetic materials contain metals like iron, steel, nickel, or cobalt which experience a magnetic pull near a magnet.\nStep 2: Non-magnetic materials like wood, glass, and plastic have no magnetic properties and experience zero attraction.\nStep 3: This property allows magnets to separate iron nails from wood shavings or plastic beads.",
          hint: "Think about what sticks to a refrigerator magnet vs what does not."
        },
        {
          question: "State the fundamental law of magnetic attraction and repulsion. What happens when two North poles are brought close together?",
          answer: "The law of magnetism states that like poles repel each other, while unlike poles attract each other. Bringing two North poles together results in repulsion (they push apart).",
          explanation: "Step 1: Every magnet has two distinct poles: a North pole (N) and a South pole (S).\nStep 2: Bringing two like poles (North-North or South-South) together creates a repulsive magnetic force pushing them apart.\nStep 3: Bringing opposite poles (North-South) together creates an attractive magnetic force pulling them together.",
          hint: "Like poles push apart; unlike poles pull together."
        },
        {
          question: "Why does a freely suspended bar magnet always come to rest in the geographic North-South direction?",
          answer: "Earth acts as a giant natural magnet. The magnetic field of the Earth exerts forces on the freely suspended bar magnet, aligning its North pole toward Earth's geographic North.",
          explanation: "Step 1: A bar magnet suspended by a thread is free to rotate horizontally without friction.\nStep 2: Earth's magnetic field exerts magnetic forces on both ends of the bar magnet.\nStep 3: The magnet turns until its North-seeking pole points toward geographic North and its South-seeking pole points toward geographic South.",
          hint: "Earth has its own natural magnetic field acting on the bar magnet."
        },
        {
          question: "Where is the magnetic strength of a bar magnet concentrated? How can you demonstrate this using iron filings?",
          answer: "The magnetic strength is maximum at the two poles (North and South poles). Sprinkling iron filings over a bar magnet shows that most filings cling near the two ends, while very few stick to the middle.",
          explanation: "Step 1: Magnetic field lines are concentrated most densely at the two poles of a magnet.\nStep 2: When iron filings are scattered on paper over a magnet, magnetic attraction pulls most filings toward the ends.\nStep 3: This demonstrates that magnetic attraction is strongest at the poles and weakest at the center.",
          hint: "Observe where most iron filings cluster on a bar magnet."
        },
        {
          question: "List two precautions to prevent a magnet from losing its magnetism (demagnetization). How should bar magnets be stored safely?",
          answer: "1. Never heat, hammer, or drop magnets from a height. 2. Store bar magnets in pairs with opposite poles facing each other, separated by wood, with soft iron keepers across their ends.",
          explanation: "Step 1: Heating, dropping, or hammering disrupts the alignment of microscopic magnetic domains inside the magnet.\nStep 2: When magnetic domains become randomly scattered, the magnet loses its overall magnetic force.\nStep 3: Soft iron keepers across opposite poles form a closed magnetic loop, preserving domain alignment.",
          hint: "Physical shock and heat destroy magnetic domain alignment."
        }
      ];

    case "LIGHT":
      return [
        {
          question: "Differentiate between transparent, translucent, and opaque materials with one example of each.",
          answer: "Transparent: Allows light to pass completely (e.g., Clear Glass). Translucent: Allows light to pass partially (e.g., Butter Paper). Opaque: Does not allow light to pass at all (e.g., Wood/Cardboard).",
          explanation: "Step 1: Transparent objects transmit almost all light rays so we can see clearly through them.\nStep 2: Translucent objects scatter light as it passes through, making objects behind them appear blurry.\nStep 3: Opaque objects block light completely by absorbing or reflecting it, creating dark shadows behind them.",
          hint: "Compare clear glass, butter paper, and a wooden block."
        },
        {
          question: "What are the three essential conditions required for the formation of a shadow?",
          answer: "1. A source of light. 2. An opaque or translucent object to block light. 3. A screen (like a wall, floor, or paper) on which the shadow is cast.",
          explanation: "Step 1: Light travels in straight lines (rectilinear propagation).\nStep 2: When an opaque object blocks light rays, light cannot bend around it, forming a dark area behind the object.\nStep 3: The dark region falls on a screen or surface, making the shadow visible.",
          hint: "You need light, an obstacle, and a surface behind it."
        },
        {
          question: "Explain why a pinhole camera forms an inverted (upside-down) image of a bright object.",
          answer: "Light travels in straight lines. Light rays from the top of the object travel straight through the pinhole to the bottom of the screen, while rays from the bottom travel to the top.",
          explanation: "Step 1: Light rays emitted from the top of an object travel in a straight path through the tiny pinhole.\nStep 2: These rays hit the bottom of the tracing paper screen inside the camera.\nStep 3: Light rays from the bottom of the object cross over to hit the top of the screen, creating an upside-down (inverted) real image.",
          hint: "Light rays cross paths in straight lines as they pass through the tiny hole."
        },
        {
          question: "Differentiate between a shadow and a mirror reflection image.",
          answer: "A shadow is a dark outline formed when an object blocks light, without showing colors or details. A mirror reflection shows the exact colors, shape, and detailed features of the object.",
          explanation: "Step 1: Shadows are formed by obstruction of light and show only a black outline regardless of object color.\nStep 2: Mirror images are formed by reflection of light from a smooth surface, preserving colors, details, and features.\nStep 3: Mirror images also undergo lateral inversion (left appears right).",
          hint: "Shadows are dark outlines; mirror reflections show full colors and details."
        }
      ];

    case "ELECTRICITY":
      return [
        {
          question: "What is an electric circuit? Differentiate between an open circuit and a closed circuit.",
          answer: "An electric circuit is a continuous closed path along which electric current flows. A closed circuit is complete so current flows; an open circuit has a break so current stops flowing.",
          explanation: "Step 1: Electric current requires an unbroken conducting path connecting the positive and negative terminals of an electric cell.\nStep 2: In a closed circuit, the switch is ON, allowing continuous flow of electric charges.\nStep 3: In an open circuit, the switch is OFF or wire is broken, stopping current flow completely.",
          hint: "Current only flows when the loop is complete without gaps."
        },
        {
          question: "Define electrical conductors and insulators. Give two examples of each.",
          answer: "Conductors allow electric current to pass through them easily (e.g., Copper, Aluminum). Insulators do not allow electric current to pass through them (e.g., Rubber, Plastic).",
          explanation: "Step 1: Conductors contain free electric charges (electrons) that move easily when connected to a battery.\nStep 2: Metals like copper and iron are good conductors used in electrical wiring.\nStep 3: Insulators like rubber, plastic, and glass hold electric charges tightly, preventing current flow and protecting us from shocks.",
          hint: "Why are copper wires covered in plastic?"
        },
        {
          question: "Why are electrician tools (pliers and screwdrivers) coated with rubber or plastic handles?",
          answer: "Rubber and plastic are electrical insulators. They prevent electric current from passing through the metal tool into the electrician's body, protecting them from electric shocks.",
          explanation: "Step 1: The metal body of a tool conducts electricity if it touches a live wire.\nStep 2: Rubber and plastic handles act as insulating barriers because current cannot pass through them.\nStep 3: This keeps the user safe by blocking electric current from entering their hands.",
          hint: "Rubber and plastic stop electric current from passing into your body."
        }
      ];

    case "MOTION":
      return [
        {
          question: "Why should hand-span or cubit NOT be used as a standard unit of length? What is the SI unit of length?",
          answer: "Hand-spans vary from person to person, causing inconsistent measurements. Standard units stay constant for everyone. The SI unit of length is the meter (m).",
          explanation: "Step 1: Body measurements differ across individuals, leading to errors in trade and science.\nStep 2: A standard unit provides a fixed, reliable length accepted worldwide.\nStep 3: The International System of Units (SI) established the meter (m) as the global baseline for length.",
          hint: "Standard units must be identical for all people."
        },
        {
          question: "Differentiate between rectilinear motion and periodic motion with one example of each.",
          answer: "Rectilinear motion is movement along a straight line (e.g., A car moving on a straight road). Periodic motion repeats itself at equal intervals of time (e.g., A swinging pendulum).",
          explanation: "Step 1: Objects in rectilinear motion travel along a straight path without changing direction.\nStep 2: Objects in periodic motion repeat their back-and-forth movement at regular, fixed time intervals.\nStep 3: Pendulums, clock hands, and musical strings demonstrate periodic motion.",
          hint: "Straight line motion vs repeating back-and-forth motion."
        },
        {
          question: "How would you measure the length of a curved line using a thread and a meter ruler?",
          answer: "Place a thread along the curved line from start to end, mark the two points on the thread, then stretch the thread straight along a meter ruler to read the exact length.",
          explanation: "Step 1: A rigid ruler cannot bend along a curve, but flexible thread fits the curve precisely.\nStep 2: Carefully trace the curve with the thread and mark the initial and final endpoints.\nStep 3: Straighten the thread along a standard ruler to measure the distance between the two marks in centimeters.",
          hint: "Flex the thread along the curve, then measure the straight thread on a ruler."
        }
      ];

    case "FOOD_NUTRITION":
      return [
        {
          question: "What is a balanced diet? Name the key nutrients needed for a healthy human body.",
          answer: "A balanced diet contains all essential nutrients (carbohydrates, fats, proteins, vitamins, minerals, roughage, and water) in the right proportions for healthy growth and energy.",
          explanation: "Step 1: Carbohydrates and fats provide energy; proteins build and repair body tissues.\nStep 2: Vitamins and minerals protect against diseases and maintain organ function.\nStep 3: Roughage (fiber) assists digestion, and water transports nutrients throughout the body.",
          hint: "A healthy diet combines energy, growth, and disease-fighting nutrients."
        },
        {
          question: "What are deficiency diseases? Mention two deficiency diseases along with their missing nutrients.",
          answer: "Diseases caused by the lack of specific essential nutrients in the diet over a long period. Examples: 1. Scurvy (Vitamin C deficiency). 2. Goitre (Iodine deficiency).",
          explanation: "Step 1: Prolonged lack of vitamins or minerals impairs specific body functions.\nStep 2: Lack of Vitamin C leads to bleeding gums (Scurvy); lack of Iodine leads to neck swelling (Goitre).\nStep 3: Eating a varied balanced diet prevents all nutrient deficiency diseases.",
          hint: "Long-term lack of vitamins or minerals causes specific health conditions."
        }
      ];

    case "PLANTS_BOTANY":
      return [
        {
          question: "Differentiate between taproot and fibrous root systems with one example of each.",
          answer: "A taproot has one main thick root growing straight down with smaller side branches (e.g., Mustard, Carrot). A fibrous root has a cluster of thin, similar roots branching from the stem base (e.g., Grass, Wheat).",
          explanation: "Step 1: Taproots consist of a single main primary root extending deep into the soil.\nStep 2: Fibrous roots consist of a dense bushy cluster of equal-sized roots spreading shallowly.\nStep 3: Plants with reticulate leaf veins have taproots; plants with parallel leaf veins have fibrous roots.",
          hint: "One main central root vs a bushy cluster of thin roots."
        },
        {
          question: "What is photosynthesis? Name the raw materials used and products formed during photosynthesis.",
          answer: "Photosynthesis is the process by which green leaves prepare food using carbon dioxide and water in the presence of sunlight and chlorophyll. Products: Glucose (food) and Oxygen gas.",
          explanation: "Step 1: Green leaves absorb carbon dioxide through stomata and water through roots.\nStep 2: Chlorophyll traps solar energy to combine carbon dioxide and water into glucose.\nStep 3: Oxygen gas is released into the air as a vital byproduct.",
          hint: "Green leaves use sunlight, water, and air to make food."
        }
      ];

    case "BODY_ANIMALS":
      return [
        {
          question: "What is a joint in the human body? Differentiate between a Ball and Socket joint and a Hinge joint.",
          answer: "A joint is the location where two or more bones meet. Ball & Socket joint permits 360-degree movement in all directions (e.g., Shoulder). Hinge joint permits movement in only one direction (e.g., Elbow/Knee).",
          explanation: "Step 1: At a ball & socket joint, a rounded bone head fits into a cup-like socket, allowing full circular rotation.\nStep 2: At a hinge joint, bones fit together like door hinges, allowing back-and-forth movement in one plane.\nStep 3: Smooth cartilage and synovial fluid at joints prevent bones from grinding.",
          hint: "Full circular rotation vs door-hinge back-and-forth movement."
        }
      ];

    case "FRACTIONS":
      return [
        {
          question: "Define proper fraction, improper fraction, and mixed fraction with one example of each.",
          answer: "Proper fraction: Numerator < Denominator (e.g., 3/5). Improper fraction: Numerator ≥ Denominator (e.g., 7/4). Mixed fraction: Whole number + Proper fraction (e.g., 1 ¾).",
          explanation: "Step 1: Proper fractions are less than 1 whole because the numerator is smaller than denominator.\nStep 2: Improper fractions are equal to or greater than 1 whole because numerator is larger than denominator.\nStep 3: Mixed fractions write improper fractions as a whole number plus a proper fraction (7/4 = 1 ¾).",
          hint: "Compare numerator and denominator size."
        },
        {
          question: "Explain step-by-step how to add two unlike fractions 1/4 and 1/3.",
          answer: "Final Answer: 1/4 + 1/3 = 7/12.",
          explanation: "Step 1: Find the LCM of denominators 4 and 3. LCM(4, 3) = 12.\nStep 2: Convert fractions to common denominator 12: 1/4 = 3/12 and 1/3 = 4/12.\nStep 3: Add numerators: 3/12 + 4/12 = (3 + 4)/12 = 7/12.",
          hint: "Find LCM 12 and make like fractions before adding."
        },
        {
          question: "What are equivalent fractions? Find two equivalent fractions of 2/5.",
          answer: "Equivalent fractions represent the same portion of a whole. Two equivalent fractions of 2/5 are 4/10 and 6/15.",
          explanation: "Step 1: Multiply numerator and denominator by 2: (2 × 2) / (5 × 2) = 4/10.\nStep 2: Multiply numerator and denominator by 3: (2 × 3) / (5 × 3) = 6/15.\nStep 3: All these fractions simplify to the same simplest form 2/5.",
          hint: "Multiply numerator and denominator by the same number."
        }
      ];

    case "INTEGERS":
      return [
        {
          question: "State the rules for adding two negative integers and show how to evaluate (-3) + (-4).",
          answer: "Final Answer: (-3) + (-4) = -7. Rule: Add their absolute values (3 + 4 = 7) and attach a negative sign.",
          explanation: "Step 1: On a number line, start at 0 and move 3 steps to the left to reach -3.\nStep 2: To add -4, move an additional 4 steps further left from -3.\nStep 3: You land at -7. Thus, (-3) + (-4) = -7.",
          hint: "Moving left on a number line represents negative direction."
        },
        {
          question: "Evaluate (-8) - (-5) using integer rules step-by-step.",
          answer: "Final Answer: (-8) - (-5) = -3.",
          explanation: "Step 1: Subtracting a negative number is equivalent to adding its positive opposite: (-8) - (-5) = -8 + 5.\nStep 2: When adding integers with opposite signs, subtract the smaller absolute value from the larger: 8 - 5 = 3.\nStep 3: Attach the sign of the number with the larger absolute value (-8), giving -3.",
          hint: "Minus minus becomes plus: -8 + 5."
        }
      ];

    case "DECIMALS":
      return [
        {
          question: "Write 35.48 in expanded form and state the place value of the digit 8.",
          answer: "Expanded form: 30 + 5 + 4/10 + 8/100. The place value of 8 is 8 hundredths (8/100 or 0.08).",
          explanation: "Step 1: Digits to the left of the decimal point represent tens (30) and units (5).\nStep 2: Digits to the right represent tenths (4/10) and hundredths (8/100).\nStep 3: Thus 35.48 = 30 + 5 + 4/10 + 8/100.",
          hint: "Tenths is first digit after decimal, hundredths is second."
        },
        {
          question: "Convert the fraction 3/4 into a decimal step-by-step.",
          answer: "Final Answer: 3/4 = 0.75.",
          explanation: "Step 1: Multiply numerator and denominator by 25 to get a denominator of 100: (3 × 25) / (4 × 25) = 75/100.\nStep 2: Dividing 75 by 100 shifts the decimal point 2 places to the left: 75/100 = 0.75.\nStep 3: Alternatively, perform long division 3 ÷ 4 = 0.75.",
          hint: "Convert denominator 4 to 100 by multiplying by 25."
        }
      ];

    case "ALGEBRA":
      return [
        {
          question: "Define a variable and a constant in algebra with an example of an algebraic expression.",
          answer: "A variable is a symbol (like x or y) that can take different numerical values. A constant has a fixed numerical value (like 5 or 12). Example: In 3x + 7, x is variable and 7 is constant.",
          explanation: "Step 1: Variables represent unknown or changing quantities in mathematical relationships.\nStep 2: Constants remain fixed numbers regardless of context.\nStep 3: Combining variables and constants with operators (+, -, ×, ÷) creates algebraic expressions.",
          hint: "Variables change (x, y), constants stay fixed (numbers)."
        },
        {
          question: "Solve the linear equation 4x - 3 = 13 step-by-step for x.",
          answer: "Final Answer: x = 4.",
          explanation: "Step 1: Add 3 to both sides of the equation: 4x - 3 + 3 = 13 + 3 ⇒ 4x = 16.\nStep 2: Divide both sides by 4 to isolate x: 4x / 4 = 16 / 4 ⇒ x = 4.\nStep 3: Verify solution: 4(4) - 3 = 16 - 3 = 13 (Correct!).",
          hint: "Add 3 to both sides, then divide by 4."
        }
      ];

    case "GEOMETRY":
      return [
        {
          question: "Differentiate between a line segment, a line, and a ray with structural properties.",
          answer: "Line segment: Fixed length with two end points (AB). Line: Extends endlessly in both directions with zero end points (↔AB). Ray: Starts at an initial origin point and extends endlessly in one direction (→AB).",
          explanation: "Step 1: A line segment is a definite portion of a line connecting two specific points A and B.\nStep 2: A line has arrows at both ends indicating infinite extension in both directions.\nStep 3: A ray has one fixed origin point and one arrow head extending infinitely.",
          hint: "2 end points vs 0 end points vs 1 end point."
        }
      ];

    case "MENSURATION":
      return [
        {
          question: "Find the perimeter and area of a rectangle with length = 15 cm and breadth = 8 cm step-by-step.",
          answer: "Perimeter = 46 cm. Area = 120 sq cm.",
          explanation: "Step 1: Perimeter formula = 2 × (Length + Breadth) = 2 × (15 + 8) = 2 × 23 = 46 cm.\nStep 2: Area formula = Length × Breadth = 15 cm × 8 cm = 120 cm².\nStep 3: Perimeter measures boundary length (cm), while Area measures total surface space inside (cm²).",
          hint: "Perimeter = 2(l+b); Area = l × b."
        }
      ];

    case "NUMBERS":
      return [
        {
          question: "Find the HCF (Highest Common Factor) and LCM (Lowest Common Multiple) of 12 and 18 step-by-step.",
          answer: "HCF = 6, LCM = 36.",
          explanation: "Step 1: Prime factorization: 12 = 2² × 3, 18 = 2 × 3².\nStep 2: HCF = product of lowest powers of common prime factors = 2¹ × 3¹ = 6.\nStep 3: LCM = product of highest powers of all prime factors = 2² × 3² = 4 × 9 = 36.",
          hint: "Prime factors: 12 = 2×2×3, 18 = 2×3×3."
        }
      ];

    case "GENERAL_SCIENCE":
      return [
        {
          question: `Explain the fundamental concept of "${chapterTitle}" and its importance in Grade 6 Science.`,
          answer: `${chapterTitle} forms a key pillar of science by explaining physical phenomena, matter properties, or natural laws clearly.`,
          explanation: `Step 1: Observe natural phenomena and gather factual evidence related to ${chapterTitle}.\nStep 2: Formulate scientific principles based on experimental observation and controlled testing.\nStep 3: Apply these principles to explain everyday real-world applications.`,
          hint: `Focus on scientific observations and real-world facts.`
        }
      ];

    default: // GENERAL_MATH
      return [
        {
          question: `State the primary definition and core mathematical rule for solving problems in "${chapterTitle}".`,
          answer: `Solving problems in ${chapterTitle} relies on systematic arithmetic or geometric steps following established mathematical rules.`,
          explanation: `Step 1: Identify all given numerical values and unknown variables.\nStep 2: Apply the appropriate mathematical formula or operational step.\nStep 3: Simplify systematically to reach the exact numerical answer.`,
          hint: `Work step by step using standard rules.`
        }
      ];
  }
}



