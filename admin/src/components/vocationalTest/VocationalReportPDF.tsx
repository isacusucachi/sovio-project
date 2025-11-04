import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: "Helvetica",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerImage: {
    height: 24,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
    fontStyle: "italic",
    textDecoration: "underline",
  },
  header: {
    fontSize: 14,
    marginVertical: 6,
    fontWeight: "bold",
  },
  section: {
    marginVertical: 6,
  },
  sectionFlexRowSpaceBeetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 2,
    flexWrap: "wrap",
    textAlign: "justify",
  },
  text: {
    fontSize: 10,
    marginVertical: 2,
  },
  boldText: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    backgroundColor: "#d5d5d5",
    borderRightWidth: 1,
    borderColor: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
  },
  tableCell: {
    flex: 1,
    padding: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 10,
  },
  signature: {
    width: 200,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
});

type SkillResult = {
  directScore: number;
  baremosScore: number;
  skillLevel: string;
};

type SpatialSkillsResult = SkillResult & {
  cubeCountingDirectScore: number;
  foldedPaperDirectScore: number;
  assemblySolidFormsDirectScore: number;
};

type PhbTestResult = {
  attentionSkills: SkillResult;
  numericalSkills: SkillResult;
  reasoningSkills: SkillResult;
  vocabularySkills: SkillResult;
  spatialSkills: SpatialSkillsResult;
};

interface IeppoResult {
  personalStylesScore: number;
  preferredActivitiesScore: number;
  perceptionOfAbilityScore: number;
  totalScore: number;
  finalBaremosValue: number;
  correspondenceLevel: string;
}

interface IeppoTestResults {
  leaderShip: IeppoResult;
  mechanicalTechnician: IeppoResult;
  social: IeppoResult;
  organized: IeppoResult;
  artistic: IeppoResult;
  entrepreneur: IeppoResult;
  investigative: IeppoResult;
}

interface TepeTestResult {
  totalScore: number;
  result: string;
}

interface VocationalTypes {
  vocationalTypes1: string;
  vocationalTypes2: string;
}
interface CareersOption {
  careersOption1: string;
  careersOption2: string;
}
interface ReportDetails {
  fullname: string;
  dni: string;
  age: number | string;
  gender: string;
  height: string | number;
  evaluationDate: string;
  personalInformation: Record<string, any>;
  educationalService: string;
  ieppoTestResult: IeppoTestResults;
  phbTestResult: PhbTestResult;
  tepeTestResult: TepeTestResult;
  vocationalTypes: VocationalTypes;
  careersOption: CareersOption;
  observations: string;
  evaluatorFullname: string;
  evaluatorSignature: Record<string, any>;
}

interface Props {
  data: ReportDetails;
}

const InformePDF: React.FC<Props> = ({ data }) => {
  const phbResults = [
    {
      label: "Atención",
      value: data.phbTestResult?.attentionSkills?.skillLevel,
    },
    {
      label: "Habilidad Numérica",
      value: data.phbTestResult?.numericalSkills?.skillLevel,
    },
    {
      label: "Razonamiento",
      value: data.phbTestResult?.reasoningSkills?.skillLevel,
    },
    {
      label: "Vocabulario",
      value: data.phbTestResult?.vocabularySkills?.skillLevel,
    },
    {
      label: "Espacial",
      value: data.phbTestResult?.spatialSkills?.skillLevel,
    },
  ];

  const ieppoResults = [
    {
      id: "leaderShip",
      label: "Liderazgo",
      value: data.ieppoTestResult?.leaderShip,
    },
    {
      id: "mechanicalTechnician",
      label: "Técnico-Mecánico",
      value: data.ieppoTestResult?.mechanicalTechnician,
    },
    { id: "social", label: "Social", value: data.ieppoTestResult?.social },
    {
      id: "organized",
      label: "Organizado",
      value: data.ieppoTestResult?.organized,
    },
    {
      id: "artistic",
      label: "Artístico",
      value: data.ieppoTestResult?.artistic,
    },
    {
      id: "entrepreneur",
      label: "Emprendedor",
      value: data.ieppoTestResult?.entrepreneur,
    },
    {
      id: "investigative",
      label: "Investigativo",
      value: data.ieppoTestResult?.investigative,
    },
  ];

  return (
    <Document>
      {[1, 2].map((pageNumber) => (
        <Page style={styles.page} key={pageNumber}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.headerImage}
              src="/images/logo/PCM-Trabajo.png"
            />
            <Image
              style={styles.headerImage}
              src="/images/logo/logo trabajo.jpg"
            />
          </View>

          {pageNumber === 1 && (
            <>
              <Text style={styles.title}>INFORME CONFIDENCIAL SOVIO</Text>

              <View style={styles.section}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Datos del evaluado(a): </Text>
                  {data.fullname}
                </Text>
                <View style={styles.sectionFlexRowSpaceBeetween}>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>DNI: </Text>
                    {data.dni}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Fecha de eval.: </Text>
                    {data.evaluationDate}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Edad: </Text>
                    {data.age}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Genero: </Text>
                    {data.gender}
                  </Text>
                </View>
                <View style={styles.sectionFlexRowSpaceBeetween}>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Grado de instruc: </Text>
                    {data.personalInformation.cycle +
                      " " +
                      data.personalInformation.academicLevel}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Inst. Educativa: </Text>
                    {data.educationalService}
                  </Text>
                </View>

                <Text style={styles.text}>
                  <Text style={styles.boldText}>Evaluador(a): </Text>
                  {data.evaluatorFullname}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.subTitle}>
                  I- DESCRIPCIÓN DE LAS ÁREAS MEDIDAS
                </Text>

                {Object.keys(data?.phbTestResult || {}).length !== 0 && (
                  <View style={{ marginBottom: 6 }}>
                    <Text style={[styles.boldText, { marginBottom: 6 }]}>
                      {" > "}
                      Habilidades básicas
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>1- Atención: </Text>
                      Capacidad de atención y concentración a detalles.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        2- Habilidad numérica:{" "}
                      </Text>
                      Capacidad de raciocinio y cálculo numérico para resolver
                      problemas aritméticos.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>3- Razonamiento: </Text>
                      Capacidad para discriminar entre conceptos y encontrar
                      relaciones verbales y numéricas.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>4- Vocabulario: </Text>
                      Bagaje verbal y capacidad de identificación de sinónimos.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>5- Área espacial: </Text>
                      Capacidad para ubicarse en el espacio y manipular imágenes
                      de manera mental.
                    </Text>
                  </View>
                )}

                {Object.keys(data?.ieppoTestResult || {}).length !== 0 && (
                  <View style={{ marginBottom: 6 }}>
                    <Text style={[styles.boldText, { marginBottom: 6 }]}>
                      {" > "}
                      Tipificación vocacional (Estilo personal y preferencia
                      ocupacional)
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>1- Tipo Liderazgo: </Text>
                      Se caracterizan por ser dominantes, ambiciosas y seguras
                      de símismas. Se interesan comúnmente por actividades que
                      impliquen un rol directivo y demanejo de personas. Por
                      ello, suelen tener habilidades para organizar y dirigir a
                      personas,así como capacidad de persuasión y de
                      concertación.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        2- Tipo Técnico - mecánico:{" "}
                      </Text>
                      Se caracterizan por tener interés en actividades
                      relacionadas a lamanipulación de objetos, instrumentos,
                      máquinas, etc. Suele tener habilidades manuales ymecánicas
                      así como destreza física.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>3- Tipo Social: </Text>
                      Se caracterizan por ser cooperativos, serviciales y
                      sociables. Muestrancomúnmente interés en actividades que
                      involucren educar, curar o servir a otras personas.
                      Porello, usualmente poseen habilidades para ejercer un rol
                      instructivo, de apoyo o atención a otraspersonas.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>4- Tipo Organizado: </Text>
                      Suelen ser organizados y mantienen un orden y
                      planificación en susacciones. Por ello, se muestran
                      interesados en actividades que implican
                      organizarsistemáticamente datos, materiales, documentos,
                      etc. Suelen tener una alta capacidad deorganización y
                      eficiencia.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>5- Tipo Artístico: </Text>
                      Se caracterizan por ser creativos y originales. Suelen
                      mostrar interés poractividades que involucran la creación
                      e imaginación. Comúnmente las personas de este tipoposeen
                      habilidades artísticas ya sea en la música, en la pintura
                      o en otras expresionesartísticas.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        6- Tipo Investigativo:{" "}
                      </Text>
                      Se caracterizan por ser intelectuales, metódicos y
                      curiosos. Sueleninteresarse por actividades que involucran
                      el recojo sistemático y el análisis de información,
                      asícomo en la comprensión de fenómenos naturales y/o
                      sociales. Las personas de este tipocomúnmente tienen
                      capacidad de observación, análisis y de aprendizaje
                      constante.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>7- Tipo Emprendedor: </Text>
                      Las personas de este tipo tienen interés en actividades
                      que implicantomar la iniciativa, iniciar nuevas empresas
                      y/o negocios. Por ello, tienen capacidades paravender,
                      publicitar productos y negociar.
                    </Text>
                  </View>
                )}

                {Object.keys(data?.tepeTestResult || {}).length !== 0 && (
                  <View style={{ marginBottom: 6 }}>
                    <Text style={[styles.boldText, { marginBottom: 6 }]}>
                      {" > "}
                      Potencial Empresarial
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        1- Potencial empresarial muy elevadon:{" "}
                      </Text>
                      El perfil del candidato es similar al del pequeño
                      empresario urbano exitoso. La probabilidad de crear un
                      negocio y de hacerlo crecer es muy elevada.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        2- Potencial empresarial elevado:{" "}
                      </Text>
                      El perfil del candidato es bastante similar al del pequeño
                      empresario urbano exitoso. La probabilidad de crear un
                      negocio y de hacerlo crecer es elevada.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        3- Potencial empresarial por desarrollar:{" "}
                      </Text>
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        3.1- Potencial empresarial relativo:{" "}
                      </Text>
                      El perfil del candidato no es muy similar al del pequeño
                      empresario urbano exitoso y si bien tiene aspectos
                      favorables al emprendimiento tambien los tiene en contra.
                      La probabilidad de crear un negocio y de hacerlo crecer es
                      relativa.
                    </Text>
                    <Text style={styles.paragraph}>
                      <Text style={styles.boldText}>
                        3.2- Potencial empresarial bajo:{" "}
                      </Text>
                      El perfil del candidato no se asemeja al del pequeño
                      empresario urbano exitoso. La probabilidad de crear un
                      negocio y de hacerlo es baja.
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}

          {pageNumber === 2 && (
            <>
              <View style={styles.section}>
                <Text style={styles.subTitle}>II- RESULTADOS</Text>
                {Object.keys(data?.phbTestResult || {}).length !== 0 && (
                  <View>
                    <Text style={[styles.boldText, { marginBottom: 6 }]}>
                      {" > "}
                      Habilidades básicas
                    </Text>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Nº</Text>
                        <Text style={styles.tableHeader}>Área</Text>
                        <Text style={styles.tableHeader}>
                          Nivel de la habilidad
                        </Text>
                      </View>
                      {phbResults.map((result, index) => (
                        <View style={styles.tableRow} key={index}>
                          <Text style={styles.tableCell}>{index + 1}</Text>
                          <Text style={styles.tableCell}>{result.label}</Text>
                          <Text style={styles.tableCell}>{result.value}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {Object.keys(data?.ieppoTestResult || {}).length !== 0 && (
                  <View>
                    <Text style={[styles.boldText, { marginBottom: 6 }]}>
                      {" > "}
                      Tipificación vocacional (Estilo personal y preferencia
                      ocupacional)
                    </Text>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Nº</Text>
                        <Text style={styles.tableHeader}>
                          Tipos Vocacionales
                        </Text>
                        <Text style={styles.tableHeader}>
                          Nivel de correspondencia
                        </Text>
                      </View>
                      {ieppoResults.map((result, index) => (
                        <View style={styles.tableRow} key={index}>
                          <Text style={styles.tableCell}>{index + 1}</Text>
                          <Text style={styles.tableCell}>{result.label}</Text>
                          <Text style={styles.tableCell}>
                            {result.value.correspondenceLevel}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {Object.keys(data?.tepeTestResult || {}).length !== 0 && (
                  <View style={{ marginBottom: 6 }}>
                    <Text style={[styles.boldText, { marginBottom: 6 }]}>
                      {" > "}
                      Potencial Empresarial
                    </Text>
                    <Text style={styles.paragraph}>
                      {data.tepeTestResult.result}
                    </Text>
                  </View>
                )}

                <View style={{ marginBottom: 6 }}>
                  <Text style={[styles.boldText, { marginBottom: 6 }]}>
                    {" > "}
                    Obs:
                  </Text>
                  <Text style={styles.paragraph}>
                    De acuerdo a los resultados obtenidos podemos mencionar que
                    el alumno puede desarrollar sus habilidades dentro de los
                    tipos vocacionales
                  </Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.subTitle}>II- RESULTADOS</Text>
                <Text style={styles.paragraph}>
                  De acuerdo a los resultados obtenidos podemos mencionar que el
                  alumno puede desarrollar sus habilidades dentro de los tipos
                  vocacionales{" "}
                  <Text style={{ textTransform: "uppercase" }}>
                    {
                      ieppoResults.find(
                        (item) =>
                          item.id === data.vocationalTypes.vocationalTypes1
                      )?.label
                    }
                  </Text>{" "}
                  y{" "}
                  <Text style={{ textTransform: "uppercase" }}>
                    {
                      ieppoResults.find(
                        (item) =>
                          item.id === data.vocationalTypes.vocationalTypes2
                      )?.label
                    }
                  </Text>{" "}
                  dentro de las carreras opcionales como primera opción{" "}
                  {data.careersOption.careersOption1} y{" "}
                  {data.careersOption.careersOption2}.
                </Text>
              </View>

              <Image
                style={styles.signature}
                src={data.evaluatorSignature?.secure_url}
              />
            </>
          )}
        </Page>
      ))}
    </Document>
  );
};

export default InformePDF;
