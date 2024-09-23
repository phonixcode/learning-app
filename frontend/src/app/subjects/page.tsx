import Footer from "../components/Footer";
import Header from "../components/Header";
import SubjectList from "../components/SubjectList";

const SubjectsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Body */}
      <main className="flex-grow bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Subjects</h1>
        <SubjectList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SubjectsPage;
