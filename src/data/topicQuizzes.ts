import { QuizQuestion, AssertionReasonQuestion, TopicQuizData } from "../types";

export const STANDARD_AR_OPTIONS = [
  "A) Both Assertion (A) and Reason (R) are true, and Reason (R) is the correct explanation of Assertion (A).",
  "B) Both Assertion (A) and Reason (R) are true, but Reason (R) is NOT the correct explanation of Assertion (A).",
  "C) Assertion (A) is true, but Reason (R) is false.",
  "D) Assertion (A) is false, but Reason (R) is true."
];

export const TOPIC_QUIZZES: Record<string, TopicQuizData> = {
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
  }
};

/**
 * Helper to retrieve or dynamically generate 5 MCQs + 5 Assertion-Reasoning questions
 * for any given topic/chapter ID or Title!
 */
export function getTopicQuiz(chapterId: string, chapterTitle?: string): TopicQuizData {
  if (TOPIC_QUIZZES[chapterId]) {
    return TOPIC_QUIZZES[chapterId];
  }

  // Fallback / Generator for any chapter not in static dictionary
  const title = chapterTitle || chapterId;
  return {
    chapterId,
    chapterTitle: title,
    mcqs: [
      {
        id: `gen_m1_${chapterId}`,
        question: `What is the core fundamental principle behind "${title}"?`,
        options: [
          `A) Understanding key definitions and applications of ${title}`,
          `B) Memorizing arbitrary rules without logical reasoning`,
          `C) Ignoring experimental data and practical evidence`,
          `D) Applying incorrect historical assumptions`
        ],
        correctAnswer: "A",
        hint: `Focus on the foundational concepts covered in ${title}.`,
        explanation: `${title} is built on systematic principles and clear conceptual definitions.`
      },
      {
        id: `gen_m2_${chapterId}`,
        question: `Which tool or method is standardly used when analyzing topics in "${title}"?`,
        options: [
          `A) Structured step-by-step problem solving & observation`,
          `B) Guesswork without verification`,
          `C) Disregarding mathematical units and properties`,
          `D) Random trial and error without formulas`
        ],
        correctAnswer: "A",
        hint: `Standard scientific & logical methodology is key in ${title}.`,
        explanation: `Systematic observation and structured problem solving are fundamental to mastering ${title}.`
      },
      {
        id: `gen_m3_${chapterId}`,
        question: `In practical real-life scenarios, why is studying "${title}" important?`,
        options: [
          `A) It provides real-world applications in science, technology, and society`,
          `B) It has zero practical usage in everyday life`,
          `C) It only applies to ancient historical events`,
          `D) It replaces basic arithmetic entirely`
        ],
        correctAnswer: "A",
        hint: `Consider how ${title} applies to everyday life or technology.`,
        explanation: `Concepts from ${title} connect directly to practical daily applications and analytical skills.`
      },
      {
        id: `gen_m4_${chapterId}`,
        question: `What common mistake should students avoid when solving questions in "${title}"?`,
        options: [
          `A) Forgetting to check units, signs, or boundary conditions`,
          `B) Reading the question carefully`,
          `C) Verifying answer logic against given options`,
          `D) Following standard textbook steps`
        ],
        correctAnswer: "A",
        hint: `Attention to detail prevents simple calculation or conceptual errors.`,
        explanation: `Overlooking units, signs, or condition details is the most frequent source of errors.`
      },
      {
        id: `gen_m5_${chapterId}`,
        question: `How does mastering "${title}" assist in higher grade studies?`,
        options: [
          `A) It establishes a solid prerequisite foundation for advanced topics`,
          `B) It prevents learning future subjects`,
          `C) It is discarded in higher classes`,
          `D) It only applies to competitive sports`
        ],
        correctAnswer: "A",
        hint: `Building blocks in lower grades support advanced concepts later.`,
        explanation: `Mastering early fundamentals makes complex higher-grade concepts easier to comprehend.`
      },
      {
        id: `gen_m6_${chapterId}`,
        question: `What is a recommended strategy when attempting challenging numerical or analytical problems in "${title}"?`,
        options: [
          `A) Break the problem into smaller sub-steps and list given data clearly`,
          `B) Skip reading the question text and choose the largest option`,
          `C) Ignore standard formulas and make wild guesses`,
          `D) Stop immediately without attempting`
        ],
        correctAnswer: "A",
        hint: `Decomposing complex problems simplifies analysis.`,
        explanation: `Listing given parameters and breaking complex questions into logical steps leads to accurate solutions.`
      },
      {
        id: `gen_m7_${chapterId}`,
        question: `In "${title}", how are key terms and definitions verified?`,
        options: [
          `A) Through rigorous experiment, mathematical proof, and textbook standards`,
          `B) Through unverified social media opinions`,
          `C) By guessing without evidence`,
          `D) By changing definitions randomly each day`
        ],
        correctAnswer: "A",
        hint: `Scientific and academic subjects rely on verified standards.`,
        explanation: `Academic standards require empirical verification and mathematical consistency.`
      },
      {
        id: `gen_m8_${chapterId}`,
        question: `Which habit improves long-term accuracy and retention in "${title}"?`,
        options: [
          `A) Regular practice, solving sample questions, and revising key concepts`,
          `B) Cramming five minutes before an exam without understanding`,
          `C) Avoiding diagrams and visual models`,
          `D) Never re-checking solved answers`
        ],
        correctAnswer: "A",
        hint: `Consistent practice develops muscle memory and deep understanding.`,
        explanation: `Spaced revision and solving practice problems solidify conceptual mastery.`
      },
      {
        id: `gen_m9_${chapterId}`,
        question: `When interpreting diagrams or tables in "${title}", what step should be taken first?`,
        options: [
          `A) Read the title, axes labels, and legend key carefully`,
          `B) Ignore all labels and jump to conclusions`,
          `C) Guess values without checking scale units`,
          `D) Assume all values are zero`
        ],
        correctAnswer: "A",
        hint: `Labels and units give context to data in diagrams and graphs.`,
        explanation: `Carefully reading labels, units, and keys prevents misinterpretation of visual data.`
      },
      {
        id: `gen_m10_${chapterId}`,
        question: `Why is active question-asking encouraged while learning "${title}"?`,
        options: [
          `A) It clarifies doubts and deepens conceptual understanding`,
          `B) It confuses teachers and delays progress`,
          `C) It is strictly forbidden in study routines`,
          `D) It lowers test scores automatically`
        ],
        correctAnswer: "A",
        hint: `Asking 'why' and 'how' leads to deeper learning.`,
        explanation: `Inquiring about underlying reasons eliminates misconceptions and strengthens problem-solving ability.`
      }
    ],
    assertionReasons: [
      {
        id: `gen_ar1_${chapterId}`,
        assertion: `Assertion (A): Systematic study of "${title}" helps build analytical reasoning.`,
        reason: `Reason (R): Understanding core principles enables students to solve unfamiliar real-world problems.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true and Reason (R) accurately explains how conceptual mastery develops analytical problem-solving skills.`
      },
      {
        id: `gen_ar2_${chapterId}`,
        assertion: `Assertion (A): Verification of steps is an essential practice in "${title}".`,
        reason: `Reason (R): Double-checking calculations and logic helps eliminate accidental mistakes.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true and Reason (R) explains why step-by-step verification is effective.`
      },
      {
        id: `gen_ar3_${chapterId}`,
        assertion: `Assertion (A): Concepts in "${title}" can be understood without practicing examples.`,
        reason: `Reason (R): Practical exercise and visual demonstrations reinforce long-term memory retention.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: `Assertion is FALSE because active practice is necessary for deep comprehension. Reason is TRUE.`
      },
      {
        id: `gen_ar4_${chapterId}`,
        assertion: `Assertion (A): Standardized terminology and units are used throughout "${title}".`,
        reason: `Reason (R): Standard units ensure clear international communication and consistency.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true.`
      },
      {
        id: `gen_ar5_${chapterId}`,
        assertion: `Assertion (A): Visual models and interactive tools enhance conceptual clarity in "${title}".`,
        reason: `Reason (R): Visual representations make abstract concepts concrete and easier to visualize.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true and Reason (R) correctly explains why visual interactive learning is effective.`
      },
      {
        id: `gen_ar6_${chapterId}`,
        assertion: `Assertion (A): Revision of foundational definitions is vital before solving advanced questions in "${title}".`,
        reason: `Reason (R): Advanced topics build directly upon fundamental definitions and basic principles.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true and Reason (R) explains why foundational mastery is necessary.`
      },
      {
        id: `gen_ar7_${chapterId}`,
        assertion: `Assertion (A): Making errors during initial practice in "${title}" is a normal part of the learning process.`,
        reason: `Reason (R): Analyzing wrong options and reading explanations helps correct misconceptions effectively.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true and Reason (R) describes how diagnostic feedback promotes true learning.`
      },
      {
        id: `gen_ar8_${chapterId}`,
        assertion: `Assertion (A): Guessing answers randomly without reading questions is a recommended exam strategy.`,
        reason: `Reason (R): Logical elimination of incorrect options increases the probability of selecting the right answer.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "D",
        explanation: `Assertion (A) is FALSE (random guessing without reading is a poor strategy). Reason (R) is TRUE.`
      },
      {
        id: `gen_ar9_${chapterId}`,
        assertion: `Assertion (A): Topic quizzes provide targeted practice on specific curriculum chapters like "${title}".`,
        reason: `Reason (R): Chapter-wise quizzes isolate core concepts and assess student mastery step by step.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true and Reason (R) explains the primary benefit of topic-focused quizzes.`
      },
      {
        id: `gen_ar10_${chapterId}`,
        assertion: `Assertion (A): Mastering both Multiple Choice Questions and Assertion-Reason questions develops complete exam readiness.`,
        reason: `Reason (R): MCQs test factual recall & calculations while Assertion-Reason questions test logical cause-and-effect understanding.`,
        options: STANDARD_AR_OPTIONS,
        correctAnswer: "A",
        explanation: `Both statements are true and Reason (R) gives the exact pedagogical rationale for combining MCQs with Assertion-Reason questions.`
      }
    ]
  };
}
