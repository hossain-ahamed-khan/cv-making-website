
export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to Commi!</h1>
      <p className="text-center mt-4 text-gray-600">
        Please <a href="/login" className="text-blue-500 underline">log in</a> to continue.
      </p>
    </div>
  );
}
