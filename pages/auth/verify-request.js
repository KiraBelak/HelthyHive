import Image from "next/image";

const VerifyRequestPage = (props) => {
  return (
    <div className="min-h-full w-full">
      <div className="flex-1 h-full flex justify-center items-center flex-col py-12 px-4 sm:px-6  lg:px-20 xl:px-24">
        <div className="message my-4 flex justify-center flex-col items-center">
          <p
            className="font-bold flex text-center text-2xl"
            style={{ fontFamily: "Roboto", fontWeight: 700 }}
          >
            🙌 ¡Gracias por formar parte de nuestra comunidad! 🥇
          </p>
          <h2 className="mt-2">
            Te enviamos un link de acceso a tu mail para que puedas ingresar a
            la aplicación.
            <h2 />
            <h2 className="mt-6">
            Recuerda que cada que ingreses te llegará un e-mail para poder
            acceder.
            </h2>
            <h2 className="mt-8">
            ¡Diviértete! 🥇{" "}
            </h2>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyRequestPage;
