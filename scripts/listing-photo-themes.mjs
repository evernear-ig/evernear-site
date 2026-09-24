/** Thematic listing photos: 6 distinct images per filter category. */

const SOFA = "photo-1555041469-a586c61ea9bc";

function alt(es, pt, en) {
  return { es, pt, en };
}

function unsplash(u, es, pt, en, pos = "50% 42%") {
  return { u, pos, alt: alt(es, pt, en) };
}

function local(file, es, pt, en, pos = "50% 40%") {
  return { u: file, file, pos, alt: alt(es, pt, en) };
}

/** Compact row: [unsplashId, es, pt, en, pos?] */
function row([u, es, pt, en, pos]) {
  if (u === SOFA) throw new Error("Sofa photo is reserved for furniture categories");
  return unsplash(u, es, pt, en, pos);
}

function rows(entries) {
  return entries.map(row);
}

const SPORT_LOCAL = {
  football: [
    local(
      "/images/sport/sport-football-victoria.png",
      "Jugadores de fútbol en cancha durante un partido local",
      "Jogadores de futebol em campo durante uma partida local",
      "Football players on a pitch during a local match"
    ),
    local(
      "/images/sport/sport-football-liga-barrial.png",
      "Partido de liga barrial de fútbol con hinchada en las gradas",
      "Jogo de liga de bairro com torcida nas arquibancadas",
      "Neighborhood league football match with fans in the stands"
    ),
  ],
  futsal: [
    local(
      "/images/sport/sport-futsal-foz.png",
      "Equipo de futsal entrenando en cancha cubierta",
      "Time de futsal treinando em quadra coberta",
      "Futsal team training on an indoor court"
    ),
    local(
      "/images/sport/sport-futsal-copa.png",
      "Copa de futsal con jugadores disputando el balón",
      "Copa de futsal com jogadores disputando a bola",
      "Futsal cup match with players competing for the ball"
    ),
  ],
  basketball: [
    local(
      "/images/sport/sport-basket-iguazu.png",
      "Partido de básquet en cancha al aire libre en Iguazú",
      "Partida de basquete em quadra ao ar livre em Foz do Iguaçu",
      "Outdoor basketball game on a court near Iguazú"
    ),
    local(
      "/images/sport/sport-basket-foz-escuela.png",
      "Escuela de básquet con jóvenes practicando tiros",
      "Escola de basquete com jovens praticando arremessos",
      "Youth basketball school practicing shooting drills"
    ),
  ],
  volleyball: [
    local(
      "/images/sport/sport-volley-iguazu.png",
      "Equipo de vóley en partido con red y bloqueo en la red",
      "Time de vôlei em partida com bloqueio na rede",
      "Volleyball team in a match with a block at the net"
    ),
    local(
      "/images/sport/sport-volley-cde.png",
      "Jugador de vóley rematando en salto sobre la red",
      "Jogador de vôlei atacando em salto sobre a rede",
      "Volleyball player spiking over the net in mid-air"
    ),
  ],
  handball: [
    local(
      "/images/sport/sport-handball-pi.png",
      "Partido de handball con arquero deteniendo el lanzamiento",
      "Partida de handebol com goleiro defendendo o arremesso",
      "Handball match with the goalkeeper stopping a shot"
    ),
    local(
      "/images/sport/sport-handball-foz.png",
      "Jugadores de handball en ataque rápido hacia el arco",
      "Jogadores de handebol em contra-ataque em direção ao gol",
      "Handball players on a fast break toward the goal"
    ),
  ],
  martial_arts: [
    local(
      "/images/sport/sport-martial-foz.png",
      "Artistas marciales entrenando técnicas en tatami",
      "Artistas marciais treinando técnicas no tatame",
      "Martial artists practicing techniques on a tatami mat"
    ),
    local(
      "/images/sport/sport-martial-cde.png",
      "Combate de artes marciales con guardia y golpe controlado",
      "Combate de artes marciais com guarda e golpe controlado",
      "Martial arts sparring with guard stance and controlled strike"
    ),
  ],
  athletics: [
    local(
      "/images/sport/sport-athletics-maraton.png",
      "Corredores de maratón avanzando en grupo por calle urbana",
      "Corredores de maratona avançando em grupo por rua urbana",
      "Marathon runners moving together along a city street"
    ),
    local(
      "/images/sport/sport-athletics-pi.png",
      "Atletas de pista en carrera de velocidad en Puerto Iguazú",
      "Atletas de pista em corrida de velocidade em Puerto Iguazú",
      "Track athletes sprinting at a regional athletics meet"
    ),
  ],
  swimming: [
    local(
      "/images/sport/sport-swim-foz.png",
      "Nadadores compitiendo en carril de pileta olímpica",
      "Nadadores competindo em raia de piscina olímpica",
      "Swimmers racing in lanes of an Olympic-size pool"
    ),
    local(
      "/images/sport/sport-swim-pi.png",
      "Entrenamiento de natación con técnica de crol en pileta",
      "Treino de natação com técnica de crawl na piscina",
      "Swimming training with freestyle stroke technique in the pool"
    ),
  ],
};

const SPORT_UNSPLASH = {
  football: rows([
    ["photo-1431324155629-1a6deb1dec8d", "Pelota de fútbol sobre césped en cancha vacía", "Bola de futebol sobre gramado em campo vazio", "Football on grass in an empty pitch"],
    ["photo-1574629810360-7d2ba7029f8d", "Jugadores disputando el balón en partido de fútbol", "Jogadores disputando a bola em partida de futebol", "Players contesting the ball in a football match"],
    ["photo-1522778119026-d647f0566c20", "Estadio de fútbol con gradas y campo iluminado", "Estádio de futebol com arquibancadas e campo iluminado", "Football stadium with stands and lit pitch"],
    ["photo-1517466787929-bc90951f0987", "Entrenamiento de fútbol juvenil con conos y balones", "Treino de futebol juvenil com cones e bolas", "Youth football training with cones and balls"],
  ]),
  futsal: rows([
    ["photo-1551958219-acbc608c6377", "Partido de futsal en cancha indoor con marcador", "Partida de futsol em quadra indoor com placar", "Indoor futsal match on a court with scoreboard"],
    ["photo-1575361204480-ddacdc147267", "Jugador de futsal driblando en espacio reducido", "Jogador de futsal driblando em espaço reduzido", "Futsal player dribbling in tight space"],
    ["photo-1518609878373-06d740f60bb8", "Equipo de futsal celebrando gol en torneo local", "Time de futsal comemorando gol em torneio local", "Futsal team celebrating a goal at a local tournament"],
    ["photo-1546519638-68b109498ffc", "Balón de futsal y zapatillas sobre piso de gimnasio", "Bola de futsal e tênis sobre piso de ginásio", "Futsal ball and shoes on a gym floor"],
  ]),
  basketball: rows([
    ["photo-1546519638-68b109498ffc", "Jugador encestando en aro de básquet en partido", "Jogador enterrando a cesta de basquete em partida", "Basketball player scoring at the hoop during a game"],
    ["photo-1504458204852-2438a8a8f1e5", "Entrenamiento de básquet con dribbling y defensa", "Treino de basquete com dribble e defesa", "Basketball practice with dribbling and defense"],
    ["photo-1519861537503-de93347e5497", "Cancha de básquet al aire libre con aros y líneas", "Quadra de basquete ao ar livre com cestas e linhas", "Outdoor basketball court with hoops and court lines"],
    ["photo-1546519650-f095aff4a804", "Equipo de básquet en timeout junto al banco", "Time de basquete em timeout junto ao banco", "Basketball team in a timeout huddle by the bench"],
  ]),
  volleyball: rows([
    ["photo-1612872087720-bb876e2e67d1", "Partido de vóley playa con salto y remate", "Partida de vôlei de praia com salto e ataque", "Beach volleyball match with jump and spike"],
    ["photo-1626224583764-f87db24ac4ea", "Jugador de vóley recibiendo saque en posición baja", "Jogador de vôlei recebendo saque em posição baixa", "Volleyball player receiving a serve in low stance"],
    ["photo-1599586120429-48281b16f7a0", "Red de vóley con pelota suspendida sobre la cancha", "Rede de vôlei com bola suspensa sobre a quadra", "Volleyball net with ball suspended above the court"],
    ["photo-1554068865-24cecd4e34b8", "Equipo de vóley celebrando punto ganado", "Time de vôlei comemorando ponto conquistado", "Volleyball team celebrating a point won"],
  ]),
  handball: rows([
    ["photo-1574629810360-7d2ba7029f8d", "Lanzamiento a gol en partido de handball indoor", "Arremesso ao gol em partida de handebol indoor", "Shot on goal during an indoor handball match"],
    ["photo-1518611012118-696072aa579a", "Entrenamiento de handball con pases rápidos", "Treino de handebol com passes rápidos", "Handball training with quick passing drills"],
    ["photo-1571019614242-c5c5dee9f50b", "Cancha de handball con arcos y líneas reglamentarias", "Quadra de handebol com gols e linhas reglamentares", "Handball court with goals and regulation lines"],
    ["photo-1461896836934-ffe607ba8211", "Jugador de handball saltando para lanzar sobre la defensa", "Jogador de handebol saltando para arremessar sobre a defesa", "Handball player jumping to throw over the defense"],
  ]),
  martial_arts: rows([
    ["photo-1549060279-7e168fcee0c2", "Entrenamiento de artes marciales con kimono en tatami", "Treino de artes marciais com quimono no tatame", "Martial arts training in gi on a tatami mat"],
    ["photo-1599058917212-d750089bc07e", "Práctica de golpes y defensa en artes marciales", "Prática de golpes e defesa em artes marciais", "Martial arts practice of strikes and blocks"],
    ["photo-1555597673-b21d5c1c79af", "Combate de artes marciales con árbitro y protección", "Combate de artes marciais com árbitro e proteção", "Martial arts bout with referee and protective gear"],
    ["photo-1517438984743-efed966a384c", "Artista marcial en posición de kata concentrado", "Artista marcial em posição de kata concentrado", "Martial artist in focused kata stance"],
  ]),
  athletics: rows([
    ["photo-1452629074695-961253016661", "Corredores de maratón en calle con dorsales y multitud", "Corredores de maratona na rua com números e multidão", "Marathon runners on a street with bibs and crowd"],
    ["photo-1571008887538-b36bbda18822", "Atleta de pista en carrera de velocidad en línea de salida", "Atleta de pista em corrida de velocidade na linha de largada", "Track athlete sprinting from the starting line"],
    ["photo-1552674605-db6ffd4facb5", "Corredor en pista de atletismo con zapatillas de clavos", "Corredor em pista de atletismo com sapatilhas de cravos", "Runner on an athletics track with spike shoes"],
    ["photo-1476480862126-209bfaa8ecc8", "Maratón con corredores avanzando en carretera abierta", "Maratona com corredores avançando em estrada aberta", "Marathon with runners advancing on an open road"],
  ]),
  swimming: rows([
    ["photo-1530549387789-4c1017266635", "Nadador en estilo crol con gorra y gafas en pileta", "Nadador em estilo crawl com touca e óculos na piscina", "Swimmer doing freestyle with cap and goggles in pool"],
    ["photo-1571902940492-38c16b57e237", "Salida de nadadores desde bloques en competencia", "Saída de nadadores dos blocos em competição", "Swimmers diving off starting blocks in competition"],
    ["photo-1519315901367-f34ff9154487", "Entrenamiento de natación con aletas y pull buoy", "Treino de natação com palmar e pull buoy", "Swimming training with fins and pull buoy"],
    ["photo-1576610616656-d3aa5d1fe423", "Pileta olímpica con carriles y nadadores en fondo", "Piscina olímpica com raias e nadadores ao fundo", "Olympic pool with lanes and swimmers in the distance"],
  ]),
};

function buildSportThemes() {
  const out = {};
  for (const [discipline, locals] of Object.entries(SPORT_LOCAL)) {
    out[discipline] = [...locals, ...SPORT_UNSPLASH[discipline]];
  }
  return out;
}

const THEMES = {
  health: {
    primary: rows([
      ["photo-1576091160399-112ba8d25d1f", "Médico de familia atendiendo consulta en consultorio", "Médico de família atendendo consulta no consultório", "Family doctor seeing a patient in a clinic office"],
      ["photo-1631217868264-e5b964844446", "Consultorio de atención primaria con signos vitales", "Consultório de atenção primária com sinais vitais", "Primary care office with vital signs equipment"],
      ["photo-1579684385127-1ef15d508118", "Profesional de salud con estetoscopio en revisión", "Profissional de saúde com estetoscópio em exame", "Healthcare worker with stethoscope during checkup"],
      ["photo-1584982751601-97dcc096659c", "Centro de salud comunitario con sala de espera", "Centro de saúde comunitário com sala de espera", "Community health center waiting room"],
      ["photo-1559757143-29579d20b2cd", "Enfermera tomando presión en atención primaria", "Enfermeira medindo pressão em atenção primária", "Nurse taking blood pressure in primary care"],
      ["photo-1576091160550-2173dba999ef", "Equipo médico en consulta de medicina general", "Equipe médica em consulta de medicina geral", "Medical team in a general medicine consultation"],
    ]),
    pediatrics: rows([
      ["photo-1555252333-9f8e92e65df9", "Pediatra examinando a un bebé en consultorio", "Pediatra examinando um bebê no consultório", "Pediatrician examining a baby in the clinic"],
      ["photo-1503454537195-1dcabb73ffb9", "Niño sonriendo en consulta pediátrica con juguete", "Criança sorrindo em consulta pediátrica com brinquedo", "Child smiling at a pediatric visit with a toy"],
      ["photo-1519494026892-80bbd4d6df07", "Sala pediátrica colorida con madre e hijo", "Sala pediátrica colorida com mãe e filho", "Colorful pediatric room with mother and child"],
      ["photo-1584515935687-5d4bcc1577d4", "Vacunación infantil en centro de salud", "Vacinação infantil em centro de saúde", "Childhood vaccination at a health center"],
      ["photo-1503676260728-1c00da094a0b", "Niños en actividad educativa de salud preventiva", "Crianças em atividade educativa de saúde preventiva", "Children in a preventive health education activity"],
      ["photo-1576091160879-890e68117963", "Instrumentos pediátricos sobre camilla de consulta", "Instrumentos pediátricos sobre maca de consulta", "Pediatric instruments on an exam table"],
    ]),
    mental: rows([
      ["photo-1573497019940-1c28c88b4f3e", "Sesión de psicoterapia en consultorio tranquilo", "Sessão de psicoterapia em consultório tranquilo", "Psychotherapy session in a calm office"],
      ["photo-1544367567-0f2fcb009e0b", "Persona meditando para bienestar emocional", "Pessoa meditando para bem-estar emocional", "Person meditating for emotional wellbeing"],
      ["photo-1506126613408-eca07ce68773", "Terapeuta escuchando a paciente en sesión individual", "Terapeuta ouvindo paciente em sessão individual", "Therapist listening to a patient in individual session"],
      ["photo-1478737270239-2f02e77fc3bd", "Grupo de apoyo emocional en círculo de conversación", "Grupo de apoio emocional em círculo de conversa", "Emotional support group in a conversation circle"],
      ["photo-1522202176988-66273c2fd55f", "Consulta de salud mental con notas y confidencialidad", "Consulta de saúde mental com anotações e confidencialidade", "Mental health consultation with notes and privacy"],
      ["photo-1516307365426-bf4d4ac5193d", "Espacio de mindfulness para regulación emocional", "Espaço de mindfulness para regulação emocional", "Mindfulness space for emotional regulation"],
    ]),
    dental: rows([
      ["photo-1606811971610-448588d57af0", "Dentista examinando dientes con espejo bucal", "Dentista examinando dentes com espelho bucal", "Dentist examining teeth with a dental mirror"],
      ["photo-1609840114035-3c981b782dfe", "Sillón odontológico y lampara en clínica dental", "Cadeira odontológica e lâmpada em clínica dental", "Dental chair and lamp in a dental clinic"],
      ["photo-1629904853716-f0bc54eea481", "Higienista dental realizando limpieza profesional", "Higienista dental realizando limpeza profissional", "Dental hygienist performing a professional cleaning"],
      ["photo-1588776814546-1ffcf47267a5", "Radiografía dental en pantalla de diagnóstico", "Radiografia dental em tela de diagnóstico", "Dental X-ray on a diagnostic screen"],
      ["photo-1598256986806-ca7a8d6a4b2a", "Consultorio odontológico con instrumental esterilizado", "Consultório odontológico com instrumental esterilizado", "Dental office with sterilized instruments"],
      ["photo-1588776814546-1ffcf47267a5", "Ortodoncia con brackets en sonrisa de paciente", "Ortodontia com brackets no sorriso do paciente", "Orthodontic braces on a patient's smile", "48% 38%"],
    ]),
    nursing: rows([
      ["photo-1559757143-29579d20b2cd", "Enfermera registrando signos vitales del paciente", "Enfermeira registrando sinais vitais do paciente", "Nurse recording patient vital signs"],
      ["photo-1579684385127-1ef15d508118", "Equipo de enfermería en pasillo hospitalario", "Equipe de enfermagem em corredor hospitalar", "Nursing team in a hospital corridor"],
      ["photo-1576091160550-2173dba999ef", "Cuidado de heridas por enfermera especializada", "Cuidado de feridas por enfermeira especializada", "Wound care by a specialized nurse"],
      ["photo-1519494026892-80bbd4d6df07", "Enfermera acompañando paciente en sala de recuperación", "Enfermeira acompanhando paciente em sala de recuperação", "Nurse accompanying a patient in recovery room"],
      ["photo-1584515935687-5d4bcc1577d4", "Visita domiciliaria de enfermería comunitaria", "Visita domiciliar de enfermagem comunitária", "Community nursing home visit"],
      ["photo-1576091160399-112ba8d25d1f", "Enfermera preparando medicación en estación clínica", "Enfermeira preparando medicação em estação clínica", "Nurse preparing medication at a clinical station"],
    ]),
    rehab: rows([
      ["photo-1576091160879-890e68117963", "Fisioterapeuta guiando ejercicios de rehabilitación", "Fisioterapeuta guiando exercícios de reabilitação", "Physiotherapist guiding rehabilitation exercises"],
      ["photo-1571019614242-c5c5dee9f50b", "Paciente en caminadora de rehabilitación física", "Paciente em esteira de reabilitação física", "Patient on a physical rehab treadmill"],
      ["photo-1534438327276-14e5300c3a48", "Terapia ocupacional con ejercicios de movilidad", "Terapia ocupacional com exercícios de mobilidade", "Occupational therapy with mobility exercises"],
      ["photo-1545389336-cf090694435e", "Rehabilitación postural con bandas elásticas", "Reabilitação postural com faixas elásticas", "Postural rehab with elastic resistance bands"],
      ["photo-1599901860904-17e06ed708a2", "Gimnasio terapéutico con equipos de recuperación", "Ginásio terapêutico com equipos de recuperação", "Therapeutic gym with recovery equipment"],
      ["photo-1517836357463-d25dfeac3438", "Sesión de kinesiología para recuperación articular", "Sessão de fisioterapia para recuperação articular", "Kinesiology session for joint recovery"],
    ]),
    prevention: rows([
      ["photo-1576091160399-112ba8d25d1f", "Chequeo preventivo con tensiómetro y historial clínico", "Check-up preventivo com tensiômetro e histórico clínico", "Preventive checkup with blood pressure cuff and records"],
      ["photo-1584515935687-5d4bcc1577d4", "Campaña de vacunación en centro comunitario", "Campanha de vacinação em centro comunitário", "Vaccination campaign at a community center"],
      ["photo-1490645935967-10de6ba17061", "Educación en nutrición preventiva con alimentos frescos", "Educação em nutrição preventiva com alimentos frescos", "Preventive nutrition education with fresh foods"],
      ["photo-1559757143-29579d20b2cd", "Tamizaje de salud con evaluación clínica básica", "Rastreamento de saúde com avaliação clínica básica", "Health screening with basic clinical assessment"],
      ["photo-1579684385127-1ef15d508118", "Charla de prevención con material informativo", "Palestra de prevenção com material informativo", "Prevention talk with informational materials"],
      ["photo-1506126613408-eca07ce68773", "Programa de prevención cardiovascular con monitoreo", "Programa de prevenção cardiovascular com monitoramento", "Cardiovascular prevention program with monitoring"],
    ]),
    maternal: rows([
      ["photo-1555252333-9f8e92e65df9", "Control prenatal con ecografía en maternidad", "Controle pré-natal com ultrassom em maternidade", "Prenatal checkup with ultrasound at maternity care"],
      ["photo-1519494026892-80bbd4d6df07", "Madre sosteniendo recién nacido en sala de maternidad", "Mãe segurando recém-nascido em sala de maternidade", "Mother holding newborn in maternity ward"],
      ["photo-1559757143-29579d20b2cd", "Matrona acompañando parto en sala de hospital", "Obstetra acompanhando parto em sala de hospital", "Midwife supporting childbirth in hospital room"],
      ["photo-1584515935687-5d4bcc1577d4", "Consulta de lactancia con especialista materno-infantil", "Consulta de amamentação com especialista materno-infantil", "Breastfeeding consultation with maternal specialist"],
      ["photo-1576091160550-2173dba999ef", "Sala de maternidad con cuna y monitoreo fetal", "Sala de maternidade com berço e monitoramento fetal", "Maternity room with crib and fetal monitoring"],
      ["photo-1503676260728-1c00da094a0b", "Grupo de embarazadas en taller prenatal comunitario", "Grupo de gestantes em oficina pré-natal comunitária", "Pregnant women group at community prenatal workshop"],
    ]),
    elderly: rows([
      ["photo-1576091160399-112ba8d25d1f", "Médico geriatra evaluando adulto mayor en consulta", "Médico geriatra avaliando idoso em consulta", "Geriatric doctor evaluating an older adult"],
      ["photo-1559757143-29579d20b2cd", "Enfermera acompañando adulto mayor en residencia", "Enfermeira acompanhando idoso em residência", "Nurse supporting an older adult in a care home"],
      ["photo-1584515935687-5d4bcc1577d4", "Fisioterapia geriátrica para movilidad segura", "Fisioterapia geriátrica para mobilidade segura", "Geriatric physiotherapy for safe mobility"],
      ["photo-1519494026892-80bbd4d6df07", "Adultos mayores en sala de actividades comunitarias", "Idosos em sala de atividades comunitárias", "Older adults in a community activities room"],
      ["photo-1579684385127-1ef15d508118", "Acompañamiento domiciliario para adultos mayores", "Acompanhamento domiciliar para idosos", "Home companionship care for older adults"],
      ["photo-1576091160879-890e68117963", "Control de medicación para paciente geriátrico", "Controle de medicação para paciente geriátrico", "Medication management for a geriatric patient"],
    ]),
    emergency: rows([
      ["photo-1519494026892-80bbd4d6df07", "Sala de emergencias con personal médico activo", "Sala de emergências com equipe médica ativa", "Emergency room with active medical staff"],
      ["photo-1576091160550-2173dba999ef", "Paramédicos atendiendo paciente en ambulancia", "Paramédicos atendendo paciente em ambulância", "Paramedics treating a patient in an ambulance"],
      ["photo-1559757143-29579d20b2cd", "Equipo de trauma en bay de urgencias hospitalaria", "Equipe de trauma em bay de urgências hospitalar", "Trauma team in hospital emergency bay"],
      ["photo-1584515935687-5d4bcc1577d4", "Monitor de signos vitales en unidad de cuidados críticos", "Monitor de sinais vitais em unidade de cuidados críticos", "Vital signs monitor in critical care unit"],
      ["photo-1576091160399-112ba8d25d1f", "Médico de guardia evaluando urgencia en triage", "Médico de plantão avaliando urgência em triagem", "On-call doctor assessing urgency at triage"],
      ["photo-1579684385127-1ef15d508118", "Desfibrilador y carro de paro en emergencias", "Desfibrilador e carro de parada em emergências", "Defibrillator and crash cart in emergency area"],
    ]),
    telehealth: rows([
      ["photo-1573497019940-1c28c88b4f3e", "Consulta médica por videollamada desde casa", "Consulta médica por videoconferência em casa", "Medical video consultation from home"],
      ["photo-1460925895917-afdab827c52f", "Telemedicina con laptop y historial digital", "Telemedicina com laptop e prontuário digital", "Telemedicine with laptop and digital records"],
      ["photo-1551288049-bebda4e38f71", "App de salud digital en tablet con métricas", "App de saúde digital em tablet com métricas", "Digital health app on tablet with metrics"],
      ["photo-1576091160399-112ba8d25d1f", "Médico remoto guiando paciente por pantalla", "Médico remoto orientando paciente por tela", "Remote doctor guiding patient via screen"],
      ["photo-1584515935687-5d4bcc1577d4", "Monitoreo remoto de signos con dispositivos conectados", "Monitoramento remoto de sinais com dispositivos conectados", "Remote vital monitoring with connected devices"],
      ["photo-1522202176988-66273c2fd55f", "Teleconsulta grupal con especialistas en red", "Teleconsulta em grupo com especialistas em rede", "Group teleconsultation with networked specialists"],
    ]),
  },
  wellness: {
    yoga: rows([
      ["photo-1544367567-0f2fcb009e0b", "Persona en postura de yoga sobre mat en estudio", "Pessoa em postura de yoga sobre tapete em estúdio", "Person in a yoga pose on a mat in a studio"],
      ["photo-1506126613408-eca07ce68773", "Clase de yoga grupal en sala luminosa", "Aula de yoga em grupo em sala luminosa", "Group yoga class in a bright room"],
      ["photo-1545389336-cf090694435e", "Meditación activa con estiramientos de yoga", "Meditação ativa com alongamentos de yoga", "Active meditation with yoga stretches"],
      ["photo-1599901860904-17e06ed708a2", "Instructora guiando respiración en sesión de yoga", "Instrutora guiando respiração em sessão de yoga", "Instructor guiding breathwork in a yoga session"],
      ["photo-1518611012118-696072aa579a", "Yoga al aire libre con amanecer y silencio", "Yoga ao ar livre com amanhecer e silêncio", "Outdoor yoga at sunrise in quiet setting"],
      ["photo-1508672019048-805c086b109e", "Estudio de yoga con velas y mats alineados", "Estúdio de yoga com velas e tapetes alinhados", "Yoga studio with candles and aligned mats"],
    ]),
    meditation: rows([
      ["photo-1506126613408-eca07ce68773", "Persona meditando sentada con ojos cerrados", "Pessoa meditando sentada com olhos fechados", "Person meditating seated with eyes closed"],
      ["photo-1544367567-0f2fcb009e0b", "Sesión de meditación guiada en grupo pequeño", "Sessão de meditação guiada em grupo pequeno", "Guided meditation session in a small group"],
      ["photo-1516307365426-bf4d4ac5193d", "Espacio de mindfulness con cojines y luz tenue", "Espaço de mindfulness com almofadas e luz suave", "Mindfulness space with cushions and soft light"],
      ["photo-1478737270239-2f02e77fc3bd", "Meditación con cuenco tibetano y respiración", "Meditação com tigela tibetana e respiração", "Meditation with singing bowl and breathing"],
      ["photo-1522202176988-66273c2fd55f", "Retiro de meditación en entorno natural", "Retiro de meditação em ambiente natural", "Meditation retreat in a natural setting"],
      ["photo-1508672019048-805c086b109e", "Práctica de atención plena con journal y té", "Prática de atenção plena com diário e chá", "Mindfulness practice with journal and tea"],
    ]),
    psychology: rows([
      ["photo-1573497019940-1c28c88b4f3e", "Psicóloga en consulta individual con paciente", "Psicóloga em consulta individual com paciente", "Psychologist in individual session with patient"],
      ["photo-1522202176988-66273c2fd55f", "Terapia cognitiva con notas en escritorio", "Terapia cognitiva com anotações na mesa", "Cognitive therapy with notes on desk"],
      ["photo-1478737270239-2f02e77fc3bd", "Grupo terapéutico en círculo de confianza", "Grupo terapêutico em círculo de confiança", "Therapy group in a trust circle"],
      ["photo-1506126613408-eca07ce68773", "Consultorio de psicología con ambiente acogedor", "Consultório de psicologia com ambiente acolhedor", "Psychology office with welcoming atmosphere"],
      ["photo-1516307365426-bf4d4ac5193d", "Evaluación psicológica con test y conversación", "Avaliação psicológica com teste e conversa", "Psychological assessment with test and conversation"],
      ["photo-1544367567-0f2fcb009e0b", "Sesión de bienestar emocional y escucha activa", "Sessão de bem-estar emocional e escuta ativa", "Emotional wellbeing session with active listening"],
    ]),
    fitness: rows([
      ["photo-1571019614242-c5c5dee9f50b", "Entrenamiento funcional con pesas en gimnasio", "Treino funcional com pesos em academia", "Functional training with weights in a gym"],
      ["photo-1534438327276-14e5300c3a48", "Clase de fitness grupal con instructora", "Aula de fitness em grupo com instrutora", "Group fitness class with instructor"],
      ["photo-1517836357463-d25dfeac3438", "Levantamiento de pesas en rack de gimnasio", "Levantamento de pesos em rack de academia", "Weightlifting at a gym rack"],
      ["photo-1599901860904-17e06ed708a2", "Circuito de alta intensidad en box de entrenamiento", "Circuito de alta intensidade em box de treino", "High-intensity circuit in a training box"],
      ["photo-1532996122724-e3c354a0a782", "Cardio en cinta y monitor de frecuencia", "Cardio na esteira e monitor de frequência", "Cardio on treadmill with heart rate monitor"],
      ["photo-1571902940492-38c16b57e237", "Entrenamiento personal con plan personalizado", "Treino personal com plano personalizado", "Personal training with customized plan"],
    ]),
    nutrition: rows([
      ["photo-1490645935967-10de6ba17061", "Plato saludable con vegetales frescos y proteína", "Prato saudável com vegetais frescos e proteína", "Healthy plate with fresh vegetables and protein"],
      ["photo-1498837167922-ddd275144396", "Nutricionista explicando plan alimentario", "Nutricionista explicando plano alimentar", "Nutritionist explaining a meal plan"],
      ["photo-1512621776951-a57141f2eefd", "Ensalada colorida con ingredientes integrales", "Salada colorida com ingredientes integrais", "Colorful salad with whole ingredients"],
      ["photo-1504674900247-0877df9cc836", "Taller de cocina saludable con frutas y verduras", "Oficina de cozinha saudável com frutas e verduras", "Healthy cooking workshop with fruits and vegetables"],
      ["photo-1546069901-ba9599a7e63c", "Desayuno balanceado con granos y frutos secos", "Café da manhã balanceado com grãos e nuts", "Balanced breakfast with grains and nuts"],
      ["photo-1495521821757-a1efb6729352", "Consulta nutricional con balanza y registro", "Consulta nutricional com balança e registro", "Nutrition consultation with scale and log"],
    ]),
    mindfulness: rows([
      ["photo-1516307365426-bf4d4ac5193d", "Práctica de mindfulness con respiración consciente", "Prática de mindfulness com respiração consciente", "Mindfulness practice with conscious breathing"],
      ["photo-1544367567-0f2fcb009e0b", "Atención plena caminando en jardín tranquilo", "Atenção plena caminhando em jardim tranquilo", "Mindful walking in a quiet garden"],
      ["photo-1506126613408-eca07ce68773", "Body scan guiado en sala de relajación", "Body scan guiado em sala de relaxamento", "Guided body scan in relaxation room"],
      ["photo-1478737270239-2f02e77fc3bd", "Diario de gratitud en rutina de mindfulness", "Diário de gratidão em rotina de mindfulness", "Gratitude journal in mindfulness routine"],
      ["photo-1522202176988-66273c2fd55f", "Mindfulness corporativo en pausa laboral", "Mindfulness corporativo em pausa de trabalho", "Corporate mindfulness during a work break"],
      ["photo-1508672019048-805c086b109e", "Meditación breve con temporizador y silencio", "Meditação breve com temporizador e silêncio", "Short meditation with timer and silence"],
    ]),
  },
  communication: {
    radio: rows([
      ["photo-1604719312566-8912b086b4a7", "Estudio de radio con micrófono y consola de audio", "Estúdio de rádio com microfone e mesa de áudio", "Radio studio with microphone and audio console"],
      ["photo-1598488035139-bdbb2231ccc4", "Locutor grabando programa en cabina acústica", "Locutor gravando programa em cabine acústica", "Radio host recording a show in a sound booth"],
      ["photo-1478737270239-2f02e77fc3bd", "Panel de control de emisora comunitaria", "Painel de controle de emissora comunitária", "Community radio station control panel"],
      ["photo-1590602847861-f357a8772d96", "Entrevista radial con micrófonos en mesa", "Entrevista radiofônica com microfones na mesa", "Radio interview with microphones on table"],
      ["photo-1504711434969-e33886168f5c", "Antena y equipo de transmisión FM local", "Antena e equipamento de transmissão FM local", "Antenna and local FM transmission equipment"],
      ["photo-1522202176988-66273c2fd55f", "Equipo de producción radial editando contenido", "Equipe de produção radiofônica editando conteúdo", "Radio production team editing content"],
    ]),
    podcast: rows([
      ["photo-1590602847861-f357a8772d96", "Podcast con micrófonos profesionales y auriculares", "Podcast com microfones profissionais e fones", "Podcast setup with pro microphones and headphones"],
      ["photo-1649252504196-4aca12ecc644", "Grabación de podcast en estudio colaborativo", "Gravação de podcast em estúdio colaborativo", "Podcast recording in a collaborative studio"],
      ["photo-1598488035139-bdbb2231ccc4", "Conductores conversando frente a mezclador de audio", "Apresentadores conversando frente ao mixer de áudio", "Hosts talking in front of an audio mixer"],
      ["photo-1478737270239-2f02e77fc3bd", "Estudio casero de podcast con laptop y micrófono", "Estúdio caseiro de podcast com laptop e microfone", "Home podcast studio with laptop and mic"],
      ["photo-1604719312566-8912b086b4a7", "Edición de episodio de podcast en software de audio", "Edição de episódio de podcast em software de áudio", "Editing a podcast episode in audio software"],
      ["photo-1522202176988-66273c2fd55f", "Entrevista de podcast en vivo con audiencia", "Entrevista de podcast ao vivo com audiência", "Live podcast interview with audience"],
    ]),
    press: rows([
      ["photo-1504711434969-e33886168f5c", "Periodista tomando notas en conferencia de prensa", "Jornalista anotando em coletiva de imprensa", "Journalist taking notes at a press conference"],
      ["photo-1586339949912-3e9457bef6d7", "Redacción de periódico con pantallas y titulares", "Redação de jornal com telas e manchetes", "Newspaper newsroom with screens and headlines"],
      ["photo-1495020689067-37979a1201b8", "Reportero con cámara cubriendo evento local", "Repórter com câmera cobrindo evento local", "Reporter with camera covering a local event"],
      ["photo-1450101499163-c8848c66ca85", "Artículo impreso y taza de café en mesa de editor", "Artigo impresso e xícara de café na mesa do editor", "Printed article and coffee on editor desk"],
      ["photo-1505685296765-3a2730d38989", "Entrevista periodística con grabadora y bloc", "Entrevista jornalística com gravador e bloco", "Journalistic interview with recorder and notepad"],
      ["photo-1522202176988-66273c2fd55f", "Fotoperiodismo en calle con cámara y chaleco", "Fotojornalismo na rua com câmera e colete", "Street photojournalism with camera and vest"],
    ]),
    community: rows([
      ["photo-1529156069898-49953e39b3ac", "Asamblea comunitaria en plaza del barrio", "Assembleia comunitária na praça do bairro", "Community assembly in a neighborhood square"],
      ["photo-1522071820081-009f0129c71c", "Vecinos colaborando en proyecto comunitario", "Vizinhos colaborando em projeto comunitário", "Neighbors collaborating on a community project"],
      ["photo-1522202176988-66273c2fd55f", "Radio comunitaria con voluntarios en estudio", "Rádio comunitária com voluntários no estúdio", "Community radio with volunteers in studio"],
      ["photo-1478737270239-2f02e77fc3bd", "Cartelera comunitaria con avisos locales", "Mural comunitário com avisos locais", "Community bulletin board with local notices"],
      ["photo-1503676260728-1c00da094a0b", "Taller participativo de comunicación vecinal", "Oficina participativa de comunicação comunitária", "Participatory neighborhood communication workshop"],
      ["photo-1559136555-9303baea8ebd", "Red de comunicadores barriales en reunión", "Rede de comunicadores de bairro em reunião", "Neighborhood communicators network in meeting"],
    ]),
    digital: rows([
      ["photo-1460925895917-afdab827c52f", "Analítica digital en pantalla con métricas web", "Analítica digital em tela com métricas web", "Digital analytics on screen with web metrics"],
      ["photo-1551288049-bebda4e38f71", "Dashboard de redes sociales y contenido digital", "Dashboard de redes sociais e conteúdo digital", "Social media and digital content dashboard"],
      ["photo-1561070791-2526d30994b5", "Diseño de piezas para campaña digital", "Design de peças para campanha digital", "Designing assets for a digital campaign"],
      ["photo-1522202176988-66273c2fd55f", "Producción de contenido digital con cámara y laptop", "Produção de conteúdo digital com câmera e laptop", "Digital content production with camera and laptop"],
      ["photo-1559136555-9303baea8ebd", "Equipo de marketing digital en estrategia", "Equipe de marketing digital em estratégia", "Digital marketing team in strategy session"],
      ["photo-1677442136019-21780ecad995", "Inteligencia artificial aplicada a comunicación", "Inteligência artificial aplicada à comunicação", "Artificial intelligence applied to communication"],
    ]),
  },
  solidarity: {
    food: rows([
      ["photo-1488523785043-adfa3789e851", "Voluntarios sirviendo comida en comedor solidario", "Voluntários servindo comida em refeitório solidário", "Volunteers serving food at a solidarity kitchen"],
      ["photo-1556910103-1c02745aae4d", "Cajas de alimentos donados en banco de alimentos", "Caixas de alimentos doados em banco de alimentos", "Donated food boxes at a food bank"],
      ["photo-1687293233211-6b0cc3beba70", "Mercado solidario con productos frescos accesibles", "Mercado solidário com produtos frescos acessíveis", "Solidarity market with affordable fresh products"],
      ["photo-1504674900247-0877df9cc836", "Cocina comunitaria preparando raciones solidarias", "Cozinha comunitária preparando refeições solidárias", "Community kitchen preparing solidarity meals"],
      ["photo-1461896836934-ffe607ba8211", "Reparto de víveres a familias en campaña solidaria", "Distribuição de mantimentos a famílias em campanha solidária", "Food distribution to families in solidarity campaign"],
      ["photo-1522202176988-66273c2fd55f", "Donación de alimentos no perecederos en centro vecinal", "Doação de alimentos não perecíveis em centro comunitário", "Non-perishable food donation at community center"],
    ]),
    education: rows([
      ["photo-1503676260728-1c00da094a0b", "Apoyo escolar gratuito para niños en barrio", "Apoio escolar gratuito para crianças no bairro", "Free after-school support for children in neighborhood"],
      ["photo-1524178232363-1fb2b075b655", "Donación de útiles escolares en campaña solidaria", "Doação de material escolar em campanha solidária", "School supply donation in solidarity campaign"],
      ["photo-1546410531-03aa5fa4b0f0", "Biblioteca comunitaria con libros compartidos", "Biblioteca comunitária com livros compartilhados", "Community library with shared books"],
      ["photo-1523050854058-8df90110c9f1", "Mentoría educativa para estudiantes vulnerables", "Mentoria educativa para estudantes vulneráveis", "Educational mentoring for vulnerable students"],
      ["photo-1522202176988-66273c2fd55f", "Taller de alfabetización para adultos", "Oficina de alfabetização para adultos", "Adult literacy workshop"],
      ["photo-1758270705317-3ef6142d306f", "Clase solidaria con laptops prestadas", "Aula solidária com laptops emprestados", "Solidarity classroom with borrowed laptops"],
    ]),
    housing: rows([
      ["photo-1560518883-ce09059eeffa", "Construcción solidaria de vivienda comunitaria", "Construção solidária de moradia comunitária", "Solidarity construction of community housing"],
      ["photo-1486406146926-c627a92ad1ab", "Proyecto habitacional con manos voluntarias", "Projeto habitacional com mãos voluntárias", "Housing project with volunteer labor"],
      ["photo-1581578731548-c64695cc6952", "Reparación de techo en casa de familia necesitada", "Reparo de telhado em casa de família necessitada", "Roof repair at a family home in need"],
      ["photo-1450778868870-14a5deda6b1a", "Entrega de materiales para mejora de vivienda", "Entrega de materiais para melhoria de moradia", "Delivery of materials for home improvement"],
      ["photo-1522202176988-66273c2fd55f", "Asentamiento con infraestructura básica solidaria", "Assentamento com infraestrutura básica solidária", "Settlement with basic solidarity infrastructure"],
      ["photo-1566073771259-6a8506099945", "Refugio temporal para familias desplazadas", "Abrigo temporário para famílias deslocadas", "Temporary shelter for displaced families"],
    ]),
    environment: rows([
      ["photo-1542601906990-b4d3fb778b09", "Voluntarios plantando árboles en jornada ecológica", "Voluntários plantando árvores em jornada ecológica", "Volunteers planting trees on an ecological day"],
      ["photo-1532996122724-e3c354a0a782", "Limpieza de río y costa en acción ambiental", "Limpeza de rio e costa em ação ambiental", "River and shoreline cleanup in environmental action"],
      ["photo-1470071459604-3b5ec3a8fe02", "Bosque nativo protegido en reserva comunitaria", "Floresta nativa protegida em reserva comunitária", "Protected native forest in community reserve"],
      ["photo-1441974231531-c6227db76b6e", "Sendero ecológico con señalización de conservación", "Trilha ecológica com sinalização de conservação", "Ecological trail with conservation signage"],
      ["photo-1522202176988-66273c2fd55f", "Reciclaje comunitario con contenedores separados", "Reciclagem comunitária com contêineres separados", "Community recycling with sorted containers"],
      ["photo-1469854523086-cc02fe5d8800", "Educación ambiental en parque natural", "Educação ambiental em parque natural", "Environmental education in a natural park"],
    ]),
    gender: rows([
      ["photo-1573497019940-1c28c88b4f3e", "Taller de empoderamiento con mujeres en círculo", "Oficina de empoderamento com mulheres em círculo", "Empowerment workshop with women in a circle"],
      ["photo-1522202176988-66273c2fd55f", "Red de apoyo contra violencia de género", "Rede de apoio contra violência de gênero", "Support network against gender-based violence"],
      ["photo-1478737270239-2f02e77fc3bd", "Conversatorio sobre equidad de género comunitario", "Roda de conversa sobre equidade de gênero comunitária", "Community gender equity conversation circle"],
      ["photo-1529156069898-49953e39b3ac", "Marcha por derechos con pancartas inclusivas", "Marcha por direitos com faixas inclusivas", "Rights march with inclusive banners"],
      ["photo-1559136555-9303baea8ebd", "Capacitación laboral para mujeres emprendedoras", "Capacitação laboral para mulheres empreendedoras", "Job training for women entrepreneurs"],
      ["photo-1516307365426-bf4d4ac5193d", "Espacio seguro de contención y acompañamiento", "Espaço seguro de acolhimento e acompanhamento", "Safe space for support and accompaniment"],
    ]),
    children: rows([
      ["photo-1503676260728-1c00da094a0b", "Niños jugando en centro comunitario infantil", "Crianças brincando em centro comunitário infantil", "Children playing at a community child center"],
      ["photo-1503454537195-1dcabb73ffb9", "Taller creativo para infancias en barrio", "Oficina criativa para infâncias no bairro", "Creative workshop for children in neighborhood"],
      ["photo-1522202176988-66273c2fd55f", "Merienda solidaria en comedor infantil", "Lanche solidário em refeitório infantil", "Solidarity snack at a children's dining room"],
      ["photo-1544776193-352d25ca82cd", "Apoyo escolar para niños en situación vulnerable", "Apoio escolar para crianças em situação vulnerável", "School support for children in vulnerable situations"],
      ["photo-1516627145497-ae6979af6c82", "Recreación infantil con juegos cooperativos", "Recreação infantil com jogos cooperativos", "Children's recreation with cooperative games"],
      ["photo-1555252333-9f8e92e65df9", "Cuidado infantil comunitario con cuidadoras", "Cuidado infantil comunitário com cuidadoras", "Community childcare with caregivers"],
    ]),
    elderly: rows([
      ["photo-1576091160399-112ba8d25d1f", "Acompañamiento solidario a adultos mayores", "Acompanhamento solidário a idosos", "Solidarity companionship for older adults"],
      ["photo-1559757143-29579d20b2cd", "Visita domiciliaria de voluntarios a adultos mayores", "Visita domiciliar de voluntários a idosos", "Volunteer home visit to older adults"],
      ["photo-1519494026892-80bbd4d6df07", "Centro de día con actividades para la tercera edad", "Centro de dia com atividades para a terceira idade", "Day center with activities for seniors"],
      ["photo-1584515935687-5d4bcc1577d4", "Entrega de medicamentos solidarios a jubilados", "Entrega de medicamentos solidários a aposentados", "Solidarity medicine delivery to retirees"],
      ["photo-1522202176988-66273c2fd55f", "Almuerzo comunitario para adultos mayores", "Almoço comunitário para idosos", "Community lunch for older adults"],
      ["photo-1579684385127-1ef15d508118", "Taller de memoria y juegos para adultos mayores", "Oficina de memória e jogos para idosos", "Memory and games workshop for older adults"],
    ]),
    disability: rows([
      ["photo-1576091160879-890e68117963", "Rehabilitación inclusiva con terapeuta especializado", "Reabilitação inclusiva com terapeuta especializado", "Inclusive rehabilitation with specialized therapist"],
      ["photo-1571019614242-c5c5dee9f50b", "Deporte adaptado en gimnasio accesible", "Esporte adaptado em ginásio acessível", "Adaptive sport in an accessible gym"],
      ["photo-1522202176988-66273c2fd55f", "Taller de habilidades para inclusión laboral", "Oficina de habilidades para inclusão laboral", "Skills workshop for workplace inclusion"],
      ["photo-1584515935687-5d4bcc1577d4", "Señalética accesible en centro comunitario", "Sinalização acessível em centro comunitário", "Accessible signage at community center"],
      ["photo-1516307365426-bf4d4ac5193d", "Grupo de apoyo para familias con discapacidad", "Grupo de apoio para famílias com deficiência", "Support group for families with disability"],
      ["photo-1534438327276-14e5300c3a48", "Actividad inclusiva con silla de ruedas y acompañante", "Atividade inclusiva com cadeira de rodas e acompanhante", "Inclusive activity with wheelchair and companion"],
    ]),
  },
  tourism: {
    stay: rows([
      ["photo-1566073771259-6a8506099945", "Habitación de hotel con cama y luz natural", "Quarto de hotel com cama e luz natural", "Hotel room with bed and natural light"],
      ["photo-1564501049412-61c2a3083791", "Hostel acogedor con literas y área común", "Hostel acolhedor com beliches e área comum", "Cozy hostel with bunks and common area"],
      ["photo-1520250497591-112f2f40a3f4", "Resort con piscina y palmeras al atardecer", "Resort com piscina e palmeiras ao pôr do sol", "Resort with pool and palm trees at sunset"],
      ["photo-1571896349842-33c89424de2d", "Recepción de alojamiento con mapas turísticos", "Recepção de hospedagem com mapas turísticos", "Lodging reception with tourist maps"],
      ["photo-1590490360182-c33d57733427", "Cabaña de madera en entorno natural fronterizo", "Cabana de madeira em ambiente natural de fronteira", "Wooden cabin in a border region natural setting"],
      ["photo-1560185127-8721a63f9f3a", "Desayuno incluido en patio de posada local", "Café da manhã incluído no pátio de pousada local", "Included breakfast in a local inn patio"],
    ]),
    agency: rows([
      ["photo-1488646953014-85cb44e25828", "Agente de viajes planificando ruta con mapa", "Agente de viagens planejando rota com mapa", "Travel agent planning a route with a map"],
      ["photo-1469854523086-cc02fe5d8800", "Excursión organizada por agencia turística", "Excursão organizada por agência de turismo", "Tour organized by a travel agency"],
      ["photo-1522202176988-66273c2fd55f", "Mostrador de agencia con folletos trilingües", "Balcão de agência com folhetos trilíngues", "Agency counter with trilingual brochures"],
      ["photo-1488646953014-85cb44e25828", "Guía turístico con grupo en punto de encuentro", "Guia turístico com grupo em ponto de encontro", "Tour guide with group at meeting point"],
      ["photo-1469854523086-cc02fe5d8800", "Paquete turístico binacional en mostrador", "Pacote turístico binacional no balcão", "Binational tour package at the counter"],
      ["photo-1566073771259-6a8506099945", "Reservas online y atención en agencia de viajes", "Reservas online e atendimento em agência de viagens", "Online bookings and service at travel agency"],
    ]),
    attraction: rows([
      ["photo-1469854523086-cc02fe5d8800", "Cataratas del Iguazú con niebla y arcoíris", "Cataratas do Iguaçu com névoa e arco-íris", "Iguazú Falls with mist and rainbow"],
      ["photo-1488646953014-85cb44e25828", "Sendero turístico con mirador panorámico", "Trilha turística com mirante panorâmico", "Tourist trail with panoramic viewpoint"],
      ["photo-1470071459604-3b5ec3a8fe02", "Parque nacional con vegetación subtropical", "Parque nacional com vegetação subtropical", "National park with subtropical vegetation"],
      ["photo-1506905925346-21bda4d32df4", "Monumento histórico visitado por turistas", "Monumento histórico visitado por turistas", "Historic monument visited by tourists"],
      ["photo-1522202176988-66273c2fd55f", "Atracción cultural con guía explicando historia", "Atração cultural com guia explicando história", "Cultural attraction with guide explaining history"],
      ["photo-1441974231531-c6227db76b6e", "Reserva natural con fauna y flora regional", "Reserva natural com fauna e flora regional", "Natural reserve with regional wildlife and flora"],
    ]),
    food: rows([
      ["photo-1414235077428-338989a2e8c0", "Plato gourmet servido en restaurante turístico", "Prato gourmet servido em restaurante turístico", "Gourmet dish served at a tourist restaurant"],
      ["photo-1559339352-11d035aa6528", "Comida regional en mesa de restaurante local", "Comida regional em mesa de restaurante local", "Regional food on a local restaurant table"],
      ["photo-1556910103-1c02745aae4d", "Chef preparando especialidad gastronómica fronteriza", "Chef preparando especialidade gastronômica de fronteira", "Chef preparing a border region specialty"],
      ["photo-1554118811-1e0d58224f24", "Café local con pastelería artesanal", "Café local com pastelaria artesanal", "Local café with artisan pastries"],
      ["photo-1452860606245-08befc0ff4a9", "Mercado gastronómico con puestos de comida", "Mercado gastronômico com barracas de comida", "Food market with street food stalls"],
      ["photo-1504674900247-0877df9cc836", "Degustación de platos típicos trinacionales", "Degustação de pratos típicos trinacionais", "Tasting of typical trinational dishes"],
    ]),
    practical: rows([
      ["photo-1488646953014-85cb44e25828", "Mapa turístico y guía práctica en mostrador", "Mapa turístico e guia prática no balcão", "Tourist map and practical guide at counter"],
      ["photo-1522202176988-66273c2fd55f", "Información de transporte y horarios fronterizos", "Informação de transporte e horários de fronteira", "Transport info and border crossing schedules"],
      ["photo-1469854523086-cc02fe5d8800", "Señalética turística en centro de visitantes", "Sinalização turística em centro de visitantes", "Tourist signage at visitor center"],
      ["photo-1566073771259-6a8506099945", "Cambio de moneda y tips prácticos para turistas", "Câmbio de moeda e dicas práticas para turistas", "Currency exchange and practical tips for tourists"],
      ["photo-1488646953014-85cb44e25828", "Wi‑Fi y carga de equipaje en punto de información", "Wi‑Fi e guarda de bagagem em ponto de informação", "Wi‑Fi and luggage storage at info point"],
      ["photo-1522202176988-66273c2fd55f", "Teléfonos útiles y emergencias para visitantes", "Telefones úteis e emergências para visitantes", "Useful phones and emergencies for visitors"],
    ]),
  },
  commerce: {
    alimentos: rows([
      ["photo-1687293233211-6b0cc3beba70", "Frutas frescas en puesto de alimentos del mercado", "Frutas frescas em barraca de alimentos do mercado", "Fresh fruit at a market food stall"],
      ["photo-1542838132-92c53300491e", "Verduras y legumbres en góndola de supermercado", "Verduras e legumes em gôndola de supermercado", "Vegetables and legumes on a supermarket shelf"],
      ["photo-1556918936-3e73b945d24f", "Productos secos en almacén de alimentos", "Produtos secos em depósito de alimentos", "Dry goods in a food store warehouse"],
      ["photo-1604719312566-8912b086b4a7", "Panadería con hogazas recién horneadas", "Padaria com pães recém-assados", "Bakery with freshly baked loaves"],
      ["photo-1556742049-0cfed4f6a45d", "Caja registradora en comercio de alimentos", "Caixa registradora em comércio de alimentos", "Cash register at a food shop"],
      ["photo-1495521821757-a1efb6729352", "Aceite, arroz y enlatados en estantería", "Óleo, arroz e enlatados em prateleira", "Oil, rice and canned goods on a shelf"],
    ]),
    gastronomia: rows([
      ["photo-1414235077428-338989a2e8c0", "Mesa servida en restaurante de gastronomía local", "Mesa servida em restaurante de gastronomia local", "Set table at a local gastronomy restaurant"],
      ["photo-1556910103-1c02745aae4d", "Chef flameando plato en cocina profesional", "Chef flambando prato em cozinha profissional", "Chef flambéing a dish in a professional kitchen"],
      ["photo-1554118811-1e0d58224f24", "Barra de café con espresso y pasteles", "Balcão de café com espresso e doces", "Coffee bar with espresso and pastries"],
      ["photo-1452860606245-08befc0ff4a9", "Cocina abierta con platos regionales", "Cocina aberta com pratos regionais", "Open kitchen with regional dishes"],
      ["photo-1504674900247-0877df9cc836", "Degustación gastronómica en evento culinario", "Degustação gastronômica em evento culinário", "Gastronomic tasting at a culinary event"],
      ["photo-1559339352-11d035aa6528", "Vino y queso en mesa de restaurante", "Vinho e queijo em mesa de restaurante", "Wine and cheese on a restaurant table"],
    ]),
    electronica: rows([
      ["photo-1498049794561-7780e7231661", "Laptop y gadgets en mostrador de electrónica", "Laptop e gadgets no balcão de eletrônicos", "Laptop and gadgets on an electronics counter"],
      ["photo-1526374965328-7f61d4dc18c5", "Smartphones expuestos en tienda de tecnología", "Smartphones expostos em loja de tecnologia", "Smartphones displayed in a tech store"],
      ["photo-1550751827-4bd374c3f58b", "Componentes electrónicos en estantería técnica", "Componentes eletrônicos em prateleira técnica", "Electronic components on a technical shelf"],
      ["photo-1518770660439-4636190af475", "Placa de circuito y herramientas de reparación", "Placa de circuito e ferramentas de reparo", "Circuit board and repair tools"],
      ["photo-1581091226825-a6a2a5aee158", "Técnico reparando equipo electrónico en banco", "Técnico reparando equipamento eletrônico na bancada", "Technician repairing electronics on a workbench"],
      ["photo-1550009158-9ebf69173e03", "Televisor y audio en sala de exhibición", "Televisor e áudio em sala de exposição", "TV and audio in a showroom"],
    ]),
    artesanias: rows([
      ["photo-1452860606245-08befc0ff4a9", "Artesano tejiendo textil en telar manual", "Artesão tecendo têxtil em tear manual", "Artisan weaving textile on a manual loom"],
      ["photo-1441986300917-64674bd600d8", "Cerámica pintada a mano en feria artesanal", "Cerâmica pintada à mão em feira artesanal", "Hand-painted ceramics at a craft fair"],
      ["photo-1513519245088-0e12902e5a38", "Taller de artesanías con herramientas tradicionales", "Oficina de artesanato com ferramentas tradicionais", "Craft workshop with traditional tools"],
      ["photo-1578749552338-434e437ca9a9", "Collar de cuentas y joyería artesanal", "Colar de contas e joias artesanais", "Beaded necklace and artisan jewelry"],
      ["photo-1610701596007-761077692a1c", "Madera tallada y objetos decorativos hechos a mano", "Madeira entalhada e objetos decorativos feitos à mão", "Carved wood and handmade decorative objects"],
      ["photo-1596464716127-fa8297862b50", "Pintura artesanal sobre tela en mercado local", "Pintura artesanal sobre tela em mercado local", "Handmade painting on canvas at local market"],
    ]),
    herramientas: rows([
      ["photo-1581244277943-f6383b65e7f6", "Taladro y caja de herramientas en ferretería", "Furadeira e caixa de ferramentas em ferragem", "Drill and toolbox at a hardware store"],
      ["photo-1504148455326-c376925ed967", "Martillo, llaves y tornillos en mostrador", "Martelo, chaves e parafusos no balcão", "Hammer, wrenches and screws on counter"],
      ["photo-1530124566582-6d49fd090251", "Estantería de herramientas eléctricas en tienda", "Prateleira de ferramentas elétricas em loja", "Power tools shelf in a store"],
      ["photo-1581092160562-40aa08e78837", "Soldadura y equipos industriales en depósito", "Solda e equipamentos industriais em depósito", "Welding and industrial equipment in warehouse"],
      ["photo-1504328345606-18bbc8c558d7", "Cinturón de herramientas de carpintero", "Cinto de ferramentas de carpinteiro", "Carpenter's tool belt"],
      ["photo-1586864387967-d02ef85d93e8", "Tornillos, tuercas y ferretería organizada", "Parafusos, porcas e ferragens organizadas", "Organized screws, nuts and hardware"],
    ]),
    textil: rows([
      ["photo-1441986300917-64674bd600d8", "Rollos de tela de colores en tienda textil", "Rolos de tecido colorido em loja têxtil", "Rolls of colorful fabric in a textile shop"],
      ["photo-1558171813-119c7ee0d0f9", "Costurera trabajando en máquina de coser", "Costureira trabalhando em máquina de costura", "Seamstress working on a sewing machine"],
      ["photo-1610701596007-761077692a1c", "Modista probando prenda en maniquí", "Modista provando peça em manequim", "Dressmaker fitting garment on mannequin"],
      ["photo-1591047139829-d91aecb6caea", "Camisas y telas dobladas en perchero", "Camisas e tecidos dobrados em cabide", "Shirts and folded fabrics on rack"],
      ["photo-1489987707025-afc088f93e66", "Bordado artesanal sobre tela blanca", "Bordado artesanal sobre tecido branco", "Hand embroidery on white fabric"],
      ["photo-1558618666-fcd25c85cd64", "Tejido de punto y lanas en estante textil", "Tricô e lãs em prateleira têxtil", "Knitwear and yarns on textile shelf"],
    ]),
    farmacia: rows([
      ["photo-1576091160399-112ba8d25d1f", "Mostrador de farmacia con medicamentos en estante", "Balcão de farmácia com medicamentos na prateleira", "Pharmacy counter with medicines on shelf"],
      ["photo-1584308666744-24d5c474f2ae", "Farmacéutico dispensando receta al cliente", "Farmacêutico dispensando receita ao cliente", "Pharmacist dispensing prescription to customer"],
      ["photo-1631549916768-4119b2d8145c", "Vitamins and health products aisle in pharmacy", "Corredor de vitaminas e produtos de saúde em farmácia", "Vitamins and health products aisle in pharmacy"],
      ["photo-1587854697902-72a84e4b3a8b", "Frascos de medicamentos alineados en anaquel", "Frascos de medicamentos alinhados na prateleira", "Medicine bottles aligned on pharmacy shelf"],
      ["photo-1471864190181-a93a3070b6d6", "Consultorio farmacéutico con botiquín", "Consultório farmacêutico com kit de primeiros socorros", "Pharmacy consultation room with first aid kit"],
      ["photo-1585435557343-3b64280698b8", "Caja de farmacia con turnos y atención", "Caixa de farmácia com senhas e atendimento", "Pharmacy checkout with queue and service"],
    ]),
    muebles: [
      unsplash(SOFA, "Sofá verde moderno en sala de exhibición de muebles", "Sofá verde moderno em sala de exposição de móveis", "Modern green sofa in a furniture showroom"),
      unsplash("photo-1586023492125-27b2c045efd7", "Comedor con mesa de madera y sillas tapizadas", "Sala de jantar com mesa de madeira e cadeiras estofadas", "Dining room with wooden table and upholstered chairs"),
      unsplash("photo-1616486338812-3dadae4b4ace", "Dormitorio con cama, velador y lámpara", "Quarto com cama, criado-mudo e abajur", "Bedroom with bed, nightstand and lamp"),
      unsplash("photo-1618221195710-dd6b41faaea6", "Escritorio de home office con estantería", "Escritório home office com estante", "Home office desk with bookshelf"),
      unsplash("photo-1493663284031-b7e00a265aae", "Rincón de lectura con sillón y lámpara de pie", "Cantinho de leitura com poltrona e abajur de chão", "Reading nook with armchair and floor lamp"),
      unsplash("photo-1532372320572-cda25653a26d", "Estantería modular y mesa auxiliar en living", "Estante modular e mesa auxiliar na sala", "Modular shelving and side table in living room"),
    ],
    souvenirs: rows([
      ["photo-1441986300917-64674bd600d8", "Souvenirs de Iguazú en estantería de regalos", "Souvenirs de Foz do Iguaçu em prateleira de presentes", "Iguazú souvenirs on a gift shop shelf"],
      ["photo-1513519245088-0e12902e5a38", "Imanes, postales y recuerdos turísticos", "Ímãs, cartões-postais e lembranças turísticas", "Magnets, postcards and tourist keepsakes"],
      ["photo-1578749552338-434e437ca9a9", "Artesanía regional en tienda de souvenirs", "Artesanato regional em loja de souvenirs", "Regional crafts in a souvenir shop"],
      ["photo-1610701596007-761077692a1c", "Mate, termos y productos típicos en mostrador", "Chimarrão, garrafas térmicas e produtos típicos no balcão", "Mate, thermoses and typical products on counter"],
      ["photo-1596464716127-fa8297862b50", "Camisetas y bolsas con diseño trinacional", "Camisetas e bolsas com design trinacional", "T-shirts and bags with trinational design"],
      ["photo-1452860606245-08befc0ff4a9", "Recuerdos artesanales en feria de souvenirs", "Lembranças artesanais em feira de souvenirs", "Handmade keepsakes at a souvenir fair"],
    ]),
  },
  education: {
    curso: rows([
      ["photo-1524178232363-1fb2b075b655", "Aula de curso con alumnos y profesor al frente", "Sala de curso com alunos e professor à frente", "Course classroom with students and teacher up front"],
      ["photo-1546410531-03aa5fa4b0f0", "Curso intensivo con laptops y proyector", "Curso intensivo com laptops e projetor", "Intensive course with laptops and projector"],
      ["photo-1758270705317-3ef6142d306f", "Estudiantes tomando apuntes en curso presencial", "Estudantes anotando em curso presencial", "Students taking notes in an in-person course"],
      ["photo-1523050854058-8df90110c9f1", "Certificado y material de curso sobre mesa", "Certificado e material de curso sobre mesa", "Course certificate and materials on desk"],
      ["photo-1522202176988-66273c2fd55f", "Taller práctico de curso con ejercicios en grupo", "Oficina prática de curso com exercícios em grupo", "Practical course workshop with group exercises"],
      ["photo-1503676260728-1c00da094a0b", "Curso online híbrido con pantalla compartida", "Curso online híbrido com tela compartilhada", "Hybrid online course with shared screen"],
    ]),
    programa: rows([
      ["photo-1523050854058-8df90110c9f1", "Programa educativo universitario en campus", "Programa educativo universitário no campus", "University educational program on campus"],
      ["photo-1606761568499-6d2451b23be8", "Ceremonia de graduación de programa académico", "Cerimônia de formatura de programa acadêmico", "Graduation ceremony for an academic program"],
      ["photo-1524178232363-1fb2b075b655", "Coordinadores planificando programa educativo", "Coordenadores planejando programa educativo", "Coordinators planning an educational program"],
      ["photo-1546410531-03aa5fa4b0f0", "Programa de intercambio con estudiantes internacionales", "Programa de intercâmbio com estudantes internacionais", "Exchange program with international students"],
      ["photo-1522202176988-66273c2fd55f", "Cronograma de programa en pizarra de aula", "Cronograma de programa no quadro da sala", "Program schedule on classroom whiteboard"],
      ["photo-1758270705317-3ef6142d306f", "Mentores de programa guiando proyecto final", "Mentores de programa orientando projeto final", "Program mentors guiding final project"],
    ]),
    beca: rows([
      ["photo-1606761568499-6d2451b23be8", "Estudiante becado recibiendo diploma", "Estudante bolsista recebendo diploma", "Scholarship student receiving diploma"],
      ["photo-1523050854058-8df90110c9f1", "Convocatoria de becas en cartelera universitaria", "Edital de bolsas em mural universitário", "Scholarship call posted on university board"],
      ["photo-1524178232363-1fb2b075b655", "Entrevista para beca académica", "Entrevista para bolsa acadêmica", "Academic scholarship interview"],
      ["photo-1758270705317-3ef6142d306f", "Estudiante becado estudiando en biblioteca", "Estudante bolsista estudando na biblioteca", "Scholarship student studying in library"],
      ["photo-1522202176988-66273c2fd55f", "Formulario de beca y documentación en mesa", "Formulário de bolsa e documentação na mesa", "Scholarship form and documentation on desk"],
      ["photo-1503676260728-1c00da094a0b", "Grupo de becados en actividad de integración", "Grupo de bolsistas em atividade de integração", "Scholarship recipients at an integration activity"],
    ]),
  },
  events: {
    innovacion: rows([
      ["photo-1677442136019-21780ecad995", "Demo de innovación con pantalla y prototipo", "Demo de inovação com tela e protótipo", "Innovation demo with screen and prototype"],
      ["photo-1602992708529-c9fdb12905c9", "Laboratorio de innovación con impresora 3D", "Laboratório de inovação com impressora 3D", "Innovation lab with 3D printer"],
      ["photo-1559136555-9303baea8ebd", "Pitch de startup en evento de innovación", "Pitch de startup em evento de inovação", "Startup pitch at an innovation event"],
      ["photo-1522202176988-66273c2fd55f", "Stand de innovación en feria tecnológica", "Estande de inovação em feira tecnológica", "Innovation booth at a tech fair"],
      ["photo-1639762681485-074b7f938860", "Blockchain y nuevas tecnologías en panel", "Blockchain e novas tecnologias em painel", "Blockchain and new tech on a panel"],
      ["photo-1561070791-2526d30994b5", "Diseño thinking en taller de innovación", "Design thinking em oficina de inovação", "Design thinking at an innovation workshop"],
    ]),
    comunidad: rows([
      ["photo-1529156069898-49953e39b3ac", "Festival comunitario con público en plaza", "Festival comunitário com público na praça", "Community festival with crowd in square"],
      ["photo-1522071820081-009f0129c71c", "Voluntarios organizando evento vecinal", "Voluntários organizando evento comunitário", "Volunteers organizing a neighborhood event"],
      ["photo-1522202176988-66273c2fd55f", "Asamblea abierta en evento comunitario", "Assembleia aberta em evento comunitário", "Open assembly at a community event"],
      ["photo-1505685296765-3a2730d38989", "Música en vivo en encuentro comunitario", "Música ao vivo em encontro comunitário", "Live music at a community gathering"],
      ["photo-1478737270239-2f02e77fc3bd", "Stands solidarios en feria comunitaria", "Estandes solidários em feira comunitária", "Solidarity booths at a community fair"],
      ["photo-1503676260728-1c00da094a0b", "Actividades infantiles en jornada comunitaria", "Atividades infantis em jornada comunitária", "Children's activities at a community day"],
    ]),
    networking: rows([
      ["photo-1522071820081-009f0129c71c", "Profesionales conversando en evento de networking", "Profissionais conversando em evento de networking", "Professionals chatting at a networking event"],
      ["photo-1568658176307-bfbd2873abda", "Intercambio de tarjetas en cóctel de networking", "Troca de cartões em coquetel de networking", "Business card exchange at networking cocktail"],
      ["photo-1559136555-9303baea8ebd", "Ronda rápida de contactos en conferencia", "Rodada rápida de contatos em conferência", "Speed networking round at conference"],
      ["photo-1522202176988-66273c2fd55f", "Coffee break con conversaciones entre asistentes", "Coffee break com conversas entre participantes", "Coffee break with conversations among attendees"],
      ["photo-1573497019940-1c28c88b4f3e", "Panel seguido de networking en sala", "Painel seguido de networking na sala", "Panel followed by networking in hall"],
      ["photo-1486406146926-c627a92ad1ab", "Encuentro de emprendedores en rooftop", "Encontro de empreendedores em rooftop", "Entrepreneurs meetup on a rooftop"],
    ]),
    blockchain: rows([
      ["photo-1639762681485-074b7f938860", "Presentación blockchain con gráficos en pantalla", "Apresentação blockchain com gráficos na tela", "Blockchain presentation with charts on screen"],
      ["photo-1642104704774-2f7156734737", "Red descentralizada visualizada en monitor", "Rede descentralizada visualizada em monitor", "Decentralized network visualized on monitor"],
      ["photo-1621761191319-c6fb62058540", "Tokens y cripto en mesa de conferencia blockchain", "Tokens e cripto na mesa de conferência blockchain", "Tokens and crypto on blockchain conference table"],
      ["photo-1518546305927-5a555bb7020d", "Minería y nodos explicados en taller blockchain", "Mineração e nós explicados em oficina blockchain", "Mining and nodes explained in blockchain workshop"],
      ["photo-1522202176988-66273c2fd55f", "Panel de expertos blockchain ante audiencia", "Painel de especialistas blockchain diante da audiência", "Blockchain expert panel before audience"],
      ["photo-1677442136019-21780ecad995", "Smart contracts y Web3 en demo en vivo", "Smart contracts e Web3 em demo ao vivo", "Smart contracts and Web3 in live demo"],
    ]),
    dev: rows([
      ["photo-1602992708529-c9fdb12905c9", "Desarrolladores pair programming frente a monitor", "Desenvolvedores pair programming frente ao monitor", "Developers pair programming in front of monitor"],
      ["photo-1498050108023-c5249f4df085", "Código en pantalla con laptop en hackathon", "Código na tela com laptop em hackathon", "Code on screen with laptop at hackathon"],
      ["photo-1460925895917-afdab827c52f", "Dashboard y APIs en charla de desarrollo", "Dashboard e APIs em palestra de desenvolvimento", "Dashboard and APIs in development talk"],
      ["photo-1522202176988-66273c2fd55f", "Equipo dev revisando pull request en reunión", "Equipe dev revisando pull request em reunião", "Dev team reviewing pull request in meeting"],
      ["photo-1555066931-4365d14bab8c", "Terminal con código y café en escritorio dev", "Terminal com código e café na mesa dev", "Terminal with code and coffee on dev desk"],
      ["photo-1516321318423-f06f85e504b3", "Workshop de desarrollo con pizarra de arquitectura", "Workshop de desenvolvimento com quadro de arquitetura", "Development workshop with architecture whiteboard"],
    ]),
    meetup: rows([
      ["photo-1522071820081-009f0129c71c", "Meetup tech con círculo de presentaciones", "Meetup tech com rodada de apresentações", "Tech meetup with introduction circle"],
      ["photo-1522202176988-66273c2fd55f", "Charla relámpago en meetup comunitario", "Lightning talk em meetup comunitário", "Lightning talk at community meetup"],
      ["photo-1559136555-9303baea8ebd", "Pizza y cerveza en after del meetup", "Pizza e cerveja no after do meetup", "Pizza and beer at meetup afterparty"],
      ["photo-1498050108023-c5249f4df085", "Demo en vivo en meetup de desarrolladores", "Demo ao vivo em meetup de desenvolvedores", "Live demo at developers meetup"],
      ["photo-1524178232363-1fb2b075b655", "Meetup educativo en aula con proyector", "Meetup educativo em sala com projetor", "Educational meetup in classroom with projector"],
      ["photo-1505685296765-3a2730d38989", "Auditorio pequeño lleno en meetup local", "Auditório pequeno cheio em meetup local", "Small packed auditorium at local meetup"],
    ]),
    estudiantes: rows([
      ["photo-1758270705317-3ef6142d306f", "Estudiantes colaborando en proyecto grupal", "Estudantes colaborando em projeto em grupo", "Students collaborating on a group project"],
      ["photo-1523050854058-8df90110c9f1", "Campus universitario con estudiantes caminando", "Campus universitário com estudantes caminhando", "University campus with students walking"],
      ["photo-1524178232363-1fb2b075b655", "Clase universitaria con alumnos participando", "Aula universitária com alunos participando", "University class with participating students"],
      ["photo-1522202176988-66273c2fd55f", "Feria de ciencias estudiantil con posters", "Feira de ciências estudantil com pôsteres", "Student science fair with posters"],
      ["photo-1503676260728-1c00da094a0b", "Estudiantes en biblioteca preparando exámenes", "Estudantes na biblioteca preparando provas", "Students in library preparing for exams"],
      ["photo-1606761568499-6d2451b23be8", "Graduados celebrando con birretes al aire", "Formandos celebrando com capelos no ar", "Graduates celebrating with caps in the air"],
    ]),
    educacion: rows([
      ["photo-1546410531-03aa5fa4b0f0", "Aula equipada para evento educativo", "Sala equipada para evento educativo", "Classroom equipped for an educational event"],
      ["photo-1524178232363-1fb2b075b655", "Conferencia pedagógica con docentes", "Conferência pedagógica com docentes", "Pedagogy conference with teachers"],
      ["photo-1503676260728-1c00da094a0b", "Taller educativo con materiales didácticos", "Oficina educativa com materiais didáticos", "Educational workshop with teaching materials"],
      ["photo-1523050854058-8df90110c9f1", "Seminario educativo en auditorio universitario", "Seminário educativo em auditório universitário", "Educational seminar in university auditorium"],
      ["photo-1522202176988-66273c2fd55f", "Expo educativa con stands institucionales", "Expo educativa com estandes institucionais", "Education expo with institutional booths"],
      ["photo-1758270705317-3ef6142d306f", "Formación docente con pizarra interactiva", "Formação docente com quadro interativo", "Teacher training with interactive whiteboard"],
    ]),
    turismo: rows([
      ["photo-1469854523086-cc02fe5d8800", "Tour guiado en evento turístico regional", "Tour guiado em evento turístico regional", "Guided tour at a regional tourism event"],
      ["photo-1488646953014-85cb44e25828", "Feria de turismo con stands de destinos", "Feira de turismo com estandes de destinos", "Tourism fair with destination booths"],
      ["photo-1566073771259-6a8506099945", "Conferencia de turismo con mapas y folletos", "Conferência de turismo com mapas e folhetos", "Tourism conference with maps and brochures"],
      ["photo-1522202176988-66273c2fd55f", "Degustación en evento gastronómico turístico", "Degustação em evento gastronômico turístico", "Tasting at a gastronomic tourism event"],
      ["photo-1470071459604-3b5ec3a8fe02", "Excursión ecoturística en evento al aire libre", "Excursão ecoturística em evento ao ar livre", "Ecotourism excursion at outdoor event"],
      ["photo-1414235077428-338989a2e8c0", "Cena de gala en congreso de turismo", "Jantar de gala em congresso de turismo", "Gala dinner at tourism congress"],
    ]),
  },
  discovery: {
    profile: rows([
      ["photo-1573496359142-b8d87734a5a2", "Retrato profesional de persona en perfil de talento", "Retrato profissional de pessoa em perfil de talento", "Professional portrait for a talent profile"],
      ["photo-1560250097-0b93528c311a", "Ejecutivo sonriendo en foto de perfil corporativo", "Executivo sorrindo em foto de perfil corporativo", "Executive smiling in corporate profile photo"],
      ["photo-1522202176988-66273c2fd55f", "Creativo con portfolio digital en laptop", "Criativo com portfólio digital no laptop", "Creative with digital portfolio on laptop"],
      ["photo-1573497019940-1c28c88b4f3e", "Profesional presentando habilidades en entrevista", "Profissional apresentando habilidades em entrevista", "Professional presenting skills in interview"],
      ["photo-1556155092-490389064275", "Perfil de desarrollador con código de fondo", "Perfil de desenvolvedor com código ao fundo", "Developer profile with code in background"],
      ["photo-1507003211169-0a1dd7228f2d", "Foto de perfil en entorno de coworking", "Foto de perfil em ambiente de coworking", "Profile photo in coworking environment"],
    ]),
    empleo: rows([
      ["photo-1521737711862-e3b97375f903", "Entrevista laboral en oficina moderna", "Entrevista de emprego em escritório moderno", "Job interview in a modern office"],
      ["photo-1486312338219-ce68d2c6f44d", "Candidato revisando oferta de empleo en laptop", "Candidato revisando oferta de emprego no laptop", "Candidate reviewing job offer on laptop"],
      ["photo-1522202176988-66273c2fd55f", "Feria de empleo con stands de empresas", "Feira de emprego com estandes de empresas", "Job fair with company booths"],
      ["photo-1556761175-b413da4baf72", "Equipo de RRHH evaluando currículums", "Equipe de RH avaliando currículos", "HR team evaluating résumés"],
      ["photo-1573497019940-1c28c88b4f3e", "Oficina de reclutamiento con candidatos en sala", "Escritório de recrutamento com candidatos na sala", "Recruitment office with candidates in waiting room"],
      ["photo-1560250097-0b93528c311a", "Apretón de manos cerrando contrato laboral", "Aperto de mãos fechando contrato de trabalho", "Handshake closing a job contract"],
    ]),
    colaboracion: rows([
      ["photo-1522071820081-009f0129c71c", "Equipo multidisciplinario colaborando en proyecto", "Equipe multidisciplinar colaborando em projeto", "Multidisciplinary team collaborating on project"],
      ["photo-1568658176307-bfbd2873abda", "Socios definiendo colaboración en reunión", "Sócios definindo colaboração em reunião", "Partners defining collaboration in meeting"],
      ["photo-1522202176988-66273c2fd55f", "Brainstorm en pizarra para proyecto conjunto", "Brainstorm no quadro para projeto conjunto", "Whiteboard brainstorm for joint project"],
      ["photo-1559136555-9303baea8ebd", "Alianza entre organizaciones en acuerdo firmado", "Aliança entre organizações em acordo assinado", "Alliance between organizations signing agreement"],
      ["photo-1529156069898-49953e39b3ac", "Voluntarios colaborando en iniciativa comunitaria", "Voluntários colaborando em iniciativa comunitária", "Volunteers collaborating on community initiative"],
      ["photo-1602992708529-c9fdb12905c9", "Laboratorio compartido con equipos colaborando", "Laboratório compartilhado com equipes colaborando", "Shared lab with teams collaborating"],
    ]),
    pasantia: rows([
      ["photo-1523050854058-8df90110c9f1", "Pasante orientado por mentor en empresa", "Estagiário orientado por mentor na empresa", "Intern guided by mentor at company"],
      ["photo-1758270705317-3ef6142d306f", "Estudiante en pasantía tomando notas en reunión", "Estudante em estágio anotando em reunião", "Intern taking notes in a meeting"],
      ["photo-1522202176988-66273c2fd55f", "Programa de pasantías en onboarding grupal", "Programa de estágios em onboarding em grupo", "Internship program in group onboarding"],
      ["photo-1486312338219-ce68d2c6f44d", "Pasante trabajando en proyecto real con laptop", "Estagiário trabalhando em projeto real com laptop", "Intern working on real project with laptop"],
      ["photo-1524178232363-1fb2b075b655", "Certificado de pasantía y evaluación final", "Certificado de estágio e avaliação final", "Internship certificate and final evaluation"],
      ["photo-1573497019940-1c28c88b4f3e", "Supervisor feedback a pasante en oficina", "Feedback de supervisor a estagiário no escritório", "Supervisor giving feedback to intern in office"],
    ]),
  },
  innovation: {
    software: rows([
      ["photo-1498050108023-c5249f4df085", "Desarrollo de software en pantalla con IDE", "Desenvolvimento de software na tela com IDE", "Software development on screen with IDE"],
      ["photo-1460925895917-afdab827c52f", "Arquitectura de software en diagrama digital", "Arquitetura de software em diagrama digital", "Software architecture in digital diagram"],
      ["photo-1555066931-4365d14bab8c", "Programador escribiendo código en terminal", "Programador escrevendo código no terminal", "Programmer writing code in terminal"],
      ["photo-1522202176988-66273c2fd55f", "Equipo de software en daily standup", "Equipe de software em daily standup", "Software team in daily standup"],
      ["photo-1516321318423-f06f85e504b3", "Review de código en monitor doble", "Review de código em monitor duplo", "Code review on dual monitor"],
      ["photo-1602992708529-c9fdb12905c9", "QA y testing de software en laboratorio", "QA e testes de software em laboratório", "QA and software testing in lab"],
    ]),
    ai: rows([
      ["photo-1677442136019-21780ecad995", "Red neuronal visualizada en pantalla de IA", "Rede neural visualizada em tela de IA", "Neural network visualized on AI screen"],
      ["photo-1620712943543-bcc4688e7485", "Robot humanoide en demo de inteligencia artificial", "Robô humanoide em demo de inteligência artificial", "Humanoid robot in artificial intelligence demo"],
      ["photo-1555252333-9f8e92e65df9", "Machine learning con datasets en servidor", "Machine learning com datasets em servidor", "Machine learning with datasets on server"],
      ["photo-1522202176988-66273c2fd55f", "Conferencia de IA con asistente en escenario", "Conferência de IA com assistente no palco", "AI conference with assistant on stage"],
      ["photo-1551288049-bebda4e38f71", "Dashboard de modelos de IA y métricas", "Dashboard de modelos de IA e métricas", "AI models dashboard with metrics"],
      ["photo-1639762681485-074b7f938860", "Chatbot y NLP en prototipo de producto IA", "Chatbot e NLP em protótipo de produto IA", "Chatbot and NLP in AI product prototype"],
    ]),
    blockchain: rows([
      ["photo-1639762681485-074b7f938860", "Cadena de bloques en visualización 3D", "Blockchain em visualização 3D", "Blockchain in 3D visualization"],
      ["photo-1642104704774-2f7156734737", "Contratos inteligentes en pantalla de desarrollo", "Contratos inteligentes em tela de desenvolvimento", "Smart contracts on development screen"],
      ["photo-1621761191319-c6fb62058540", "Criptomonedas y wallet en app blockchain", "Criptomoedas e wallet em app blockchain", "Cryptocurrencies and wallet in blockchain app"],
      ["photo-1522202176988-66273c2fd55f", "Hackathon blockchain con equipos trabajando", "Hackathon blockchain com equipes trabalhando", "Blockchain hackathon with teams working"],
      ["photo-1518546305927-5a555bb7020d", "Nodos de red blockchain en rack de servidores", "Nós de rede blockchain em rack de servidores", "Blockchain network nodes on server rack"],
      ["photo-1677442136019-21780ecad995", "Web3 y descentralización en panel tech", "Web3 e descentralização em painel tech", "Web3 and decentralization on tech panel"],
    ]),
    startups: rows([
      ["photo-1559136555-9303baea8ebd", "Fundadores de startup en pitch a inversores", "Fundadores de startup em pitch a investidores", "Startup founders pitching to investors"],
      ["photo-1522071820081-009f0129c71c", "Equipo startup en oficina con pizarra de ideas", "Equipe startup em escritório com quadro de ideias", "Startup team in office with idea whiteboard"],
      ["photo-1556761175-b413da4baf72", "MVP en laptop durante sesión de startup", "MVP no laptop durante sessão de startup", "MVP on laptop during startup session"],
      ["photo-1522202176988-66273c2fd55f", "Demo day de startups ante panel de jueces", "Demo day de startups diante de jurados", "Startup demo day before judging panel"],
      ["photo-1602992708529-c9fdb12905c9", "Prototipo hardware en laboratorio de startup", "Protótipo hardware em laboratório de startup", "Hardware prototype in startup lab"],
      ["photo-1486406146926-c627a92ad1ab", "Oficina coworking con startups en crecimiento", "Escritório coworking com startups em crescimento", "Coworking office with growing startups"],
    ]),
    hardware: rows([
      ["photo-1602992708529-c9fdb12905c9", "Impresora 3D fabricando pieza de hardware", "Impressora 3D fabricando peça de hardware", "3D printer manufacturing a hardware part"],
      ["photo-1518770660439-4636190af475", "Placa electrónica con soldadura bajo microscopio", "Placa eletrônica com solda sob microscópio", "Circuit board with soldering under microscope"],
      ["photo-1581091226825-a6a2a5aee158", "Banco de trabajo con herramientas de electrónica", "Bancada com ferramentas de eletrônica", "Workbench with electronics tools"],
      ["photo-1522202176988-66273c2fd55f", "Prototipo IoT con sensores y microcontrolador", "Protótipo IoT com sensores e microcontrolador", "IoT prototype with sensors and microcontroller"],
      ["photo-1550751827-4bd374c3f58b", "Rack de servidores y hardware de datacenter", "Rack de servidores e hardware de datacenter", "Server rack and datacenter hardware"],
      ["photo-1518770660439-4636190af475", "Ensamblaje de dispositivo hardware en fábrica", "Montagem de dispositivo hardware em fábrica", "Hardware device assembly in factory"],
    ]),
    design: rows([
      ["photo-1561070791-2526d30994b5", "Diseñador trabajando en UI en tablet y laptop", "Designer trabalhando em UI em tablet e laptop", "Designer working on UI with tablet and laptop"],
      ["photo-1586717799252-bd134ad00e26", "Prototipo de app en Figma proyectado en pantalla", "Protótipo de app em Figma projetado na tela", "App prototype in Figma projected on screen"],
      ["photo-1522202176988-66273c2fd55f", "Workshop de diseño con post-its en pared", "Workshop de design com post-its na parede", "Design workshop with post-its on wall"],
      ["photo-1561070791-2526d30994b5", "Branding y paleta de colores en mesa creativa", "Branding e paleta de cores na mesa criativa", "Branding and color palette on creative desk"],
      ["photo-1558655146-d09347e92766", "Diseño de producto con bocetos y maquetas", "Design de produto com esboços e maquetes", "Product design with sketches and mockups"],
      ["photo-1618005182384-a83a8bd57fbe", "Ilustración digital en tableta gráfica", "Ilustração digital em mesa digitalizadora", "Digital illustration on drawing tablet"],
    ]),
    data: rows([
      ["photo-1551288049-bebda4e38f71", "Dashboard de datos con gráficos y KPIs", "Dashboard de dados com gráficos e KPIs", "Data dashboard with charts and KPIs"],
      ["photo-1460925895917-afdab827c52f", "Analista revisando métricas en pantallas", "Analista revisando métricas em telas", "Analyst reviewing metrics on screens"],
      ["photo-1522202176988-66273c2fd55f", "Ciencia de datos con notebooks y visualizaciones", "Ciência de dados com notebooks e visualizações", "Data science with notebooks and visualizations"],
      ["photo-1551288049-bebda4e38f71", "Big data en cluster de servidores iluminados", "Big data em cluster de servidores iluminados", "Big data on illuminated server cluster"],
      ["photo-1460925895917-afdab827c52f", "ETL pipeline diagramado en pizarra de equipo", "Pipeline ETL diagramado no quadro da equipe", "ETL pipeline diagrammed on team whiteboard"],
      ["photo-1551288049-bebda4e38f71", "Presentación de insights de datos a stakeholders", "Apresentação de insights de dados a stakeholders", "Data insights presentation to stakeholders"],
    ]),
    education: rows([
      ["photo-1524178232363-1fb2b075b655", "Bootcamp tech con estudiantes y mentor", "Bootcamp tech com estudantes e mentor", "Tech bootcamp with students and mentor"],
      ["photo-1758270705317-3ef6142d306f", "Aula de programación con proyector y laptops", "Sala de programação com projetor e laptops", "Programming classroom with projector and laptops"],
      ["photo-1546410531-03aa5fa4b0f0", "Curso de innovación educativa en universidad", "Curso de inovação educativa na universidade", "Educational innovation course at university"],
      ["photo-1522202176988-66273c2fd55f", "Taller STEAM para estudiantes de secundaria", "Oficina STEAM para estudantes do ensino médio", "STEAM workshop for high school students"],
      ["photo-1523050854058-8df90110c9f1", "Capacitación docente en herramientas digitales", "Capacitação docente em ferramentas digitais", "Teacher training in digital tools"],
      ["photo-1503676260728-1c00da094a0b", "E-learning con plataforma educativa en tablet", "E-learning com plataforma educativa em tablet", "E-learning with educational platform on tablet"],
    ]),
    research: rows([
      ["photo-1532094349884-543bc11b234d", "Investigador con microscopio en laboratorio", "Pesquisador com microscópio em laboratório", "Researcher with microscope in laboratory"],
      ["photo-1582719471384-894fbb16e074", "Tubos de ensayo y reactivos en banco de investigación", "Tubos de ensaio e reagentes em bancada de pesquisa", "Test tubes and reagents on research bench"],
      ["photo-1522202176988-66273c2fd55f", "Publicación científica y datos en pantalla", "Publicação científica e dados na tela", "Scientific publication and data on screen"],
      ["photo-1576086213369-f890f914ca3e", "Equipo de investigación analizando muestras", "Equipe de pesquisa analisando amostras", "Research team analyzing samples"],
      ["photo-1532187863486-abf9db6311e8", "Conferencia académica con poster de investigación", "Conferência acadêmica com pôster de pesquisa", "Academic conference with research poster"],
      ["photo-1581093450022-5c2a8d711b54", "Campo de investigación con instrumentos de medición", "Campo de pesquisa com instrumentos de medição", "Field research with measurement instruments"],
    ]),
    open_source: rows([
      ["photo-1555066931-4365d14bab8c", "Contribución open source en repositorio GitHub", "Contribuição open source em repositório GitHub", "Open source contribution on GitHub repository"],
      ["photo-1522071820081-009f0129c71c", "Comunidad open source en hackathon colaborativo", "Comunidade open source em hackathon colaborativo", "Open source community at collaborative hackathon"],
      ["photo-1522202176988-66273c2fd55f", "Maintainers revisando pull requests en reunión", "Maintainers revisando pull requests em reunião", "Maintainers reviewing pull requests in meeting"],
      ["photo-1498050108023-c5249f4df085", "Código abierto en pantalla con licencia visible", "Código aberto na tela com licença visível", "Open code on screen with visible license"],
      ["photo-1516321318423-f06f85e504b3", "Documentación open source en wiki colaborativa", "Documentação open source em wiki colaborativa", "Open source documentation on collaborative wiki"],
      ["photo-1529156069898-49953e39b3ac", "Release party de proyecto open source comunitario", "Release party de projeto open source comunitário", "Community open source project release party"],
    ]),
  },
  sport: buildSportThemes(),
};

export function getThematicPhoto(group, categorySlug, index, categoryLabel, cityId) {
  const slug = String(categorySlug).toLowerCase();
  const pool = THEMES[group]?.[slug];
  if (!pool?.[index]) {
    throw new Error(`Missing thematic photo for ${group}/${slug} index ${index}`);
  }
  return pool[index];
}
