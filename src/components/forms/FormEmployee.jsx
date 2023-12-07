import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { InputForm } from "../specific/ComponentsForm";
import { Alert } from "@mui/material";
import WarningModal from "../modals/WarningModal";
// Iconos
import { useAuth } from "../../context/AuthContext";
// Spiner
import SpinerComponent from "../../components/SpinerComponent";
//Image logo Controller
import { Formik } from "formik";
import { getUserCodeRequest } from "../../api/auth.api";
import { Toaster, toast } from "sonner";
import { getRolesRequest } from "../../api/Restaurant.pi";

export default function FormEmployee() {
  const { verifyPassword } = useAuth();
  const {
    errors_employee,
    messages,
    setMessages,
    getEmployee,
    isLoading,
    setIsLoading,
    deleteEmployee,
    createEmployee,
    updateEmployee,
  } = useEmployeeContext();
  const navigateTo = useNavigate();
  const { restaurant_id, employee_id } = useParams();
  const [employee, setEmployee] = useState(null);
  // --------- GET USER CODE----------
  const [isLoadingGetUserCode, setIsLoadingGetUserCode] = useState(false);
  const [UserCode, setGetUserCode] = useState(null);
  // ----------ROLES DATA--------------
  const [roles, setRoles] = useState(null);

  const loadRoles = async () => {
    const rolesData = await getRolesRequest();
    if (rolesData.data) {
      setRoles(rolesData.data);
    }
  };
  useEffect(() => {
    setIsLoading(true);

    if (employee_id && !employee) {
      const loadEmployee = async () => {
        try {
          const employeeData = await getEmployee(employee_id);
          if (employeeData.data) {
            setEmployee(employeeData.data);
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error al cargar el empleado:", error);
        }
      };
      loadEmployee();
    } else {
      setIsLoading(false);
    }
    loadRoles();
    setIsLoading(false);
  }, [employee_id, employee, getEmployee]);

  // Verify Password and delete employee
  const handleVerifyPassword = async (password, id) => {
    const res = await verifyPassword(password);
    if (res) {
      try {
        const res_delete_employee = await deleteEmployee(
          restaurant_id,
          employee_id
        );
        if (res_delete_employee.data) {
          return navigateTo(`/admin/restaurants/${restaurant_id}/employees`);
        }
      } catch (error) {
        alert("Error al eliminar employee :c", error.data);
        return navigateTo(
          `/admin/restaurants/${restaurant_id}/employees/update/${employee_id}`
        );
      }
    }
  };

  const handleGetUserCode = async (user_code) => {
    setIsLoadingGetUserCode(true);
    console.log(user_code);
    try {
      const res = await getUserCodeRequest(user_code);
      console.log("Usuario encontrado");
      console.log(res.data);
      setGetUserCode(res.data);
    } catch (error) {
      toast("Usuario no encontrado");
    }
    setIsLoadingGetUserCode(false);
  };
  if (isLoading && !employee) return <div className="text-center"><SpinerComponent /></div>;
  return (
    <div className="m-2 md:pt-0">
      <Toaster position="top-center" />
      {console.log(errors_employee)}
      {errors_employee.length > 0 ? toast(errors_employee[0]) : null}

      <h2 className="text-xl font-bold color-text-primary flex justify-center gap-1">
        {" "}
        Administrar empleado/{" "}
        <span className="text-black dark:text-white ">
          {employee_id ? "Editar" : "Crear"}
        </span>
      </h2>

      <Formik
        enableReinitialize={true}
        initialValues={
          employee
            ? {
                user: employee.user ? employee.user.user_code : "",
                role: employee.user && employee.role ? employee.role.id : "",
                address: employee.address || "",
                age: employee.age || "",
                phone: employee.phone || "",
              }
            : {
                user: "",
                role: 0,
                address: "",
                age: 18,
                phone: "",
              }
        }
        onSubmit={async (values) => {
          values.role = parseInt(values.role);
          if (employee_id) {
            try {
              updateEmployee(restaurant_id, employee_id, values);
              toast("Datos actualizados correctamente");
            } catch (error) {
              toast("Error al actualizar los datos");
            }
          } else {
            if (UserCode !== null) {
              values.user = UserCode.id;
              console.log(values);
              console.log(values.user);

              const data = await createEmployee(restaurant_id, values);

              if (data && data.id) {
                navigateTo(`/admin/restaurants/${restaurant_id}/employees`);
              } else {
                console.error("Error al crear el empleado:");
              }
            } else {
              toast("El usuario es requerido");
            }
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="dark:text-white">
            {/* USER CODE INFO */}
            {UserCode ? (
              <div className="text-center">
                {UserCode.picture ? (
                  <img
                    src={UserCode.picture}
                    alt={`avatar user ${UserCode.name}`}
                    className="mx-auto rounded-full w-16 h-16"
                  />
                ) : null}
                <p className="text-xl font-bold">{UserCode.name}</p>
                <p className="text-gray-500">{UserCode.email}</p>
              </div>
            ) : null}

            <div className="my-3 flex justify-center flex-col md:flex-row items-center p-4">
              <label htmlFor="user" className="mr-2">
                <b>Usuario </b>
              </label>
              <input
                className="text-black border border-gray-400 px-2 py-1 rounded-md"
                type="text"
                name="user"
                placeholder="Ingrese el id del usuario a emplear"
                onChange={handleChange}
                value={values.user}
                required
                maxLength={5}
              />
              <button
                disabled={isLoadingGetUserCode}
                type="button"
                onClick={() => handleGetUserCode(values.user)}
                className="bg-blue-500 mt-3 md:mt-0 px-2 py-1 ml-2 rounded-md text-white"
              >
                {isLoadingGetUserCode ? "Buscando..." : "Buscar"}
              </button>
            </div>


            <div className="flex flex-col items-center">
            <div className="my-3 flex justify-center items-end">
              <label htmlFor="role" className="mr-2">
                <b>Rol</b>
              </label>
              <select
                required
                onChange={handleChange}
                value={values.role}
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="text-gray-500">
                  Seleccione el rol
                </option>
                {roles
                  ? roles.map((role, index) => (
                      <option key={index} value={role.id}>
                        {role.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            
              <div className="my-3">
                <label htmlFor="address" className="w-32">
                  <b>Direccion del empleado</b>
                </label>
                <InputForm
                  name="address"
                  placeholder="Escribe la dirección del empleado"
                  onChange={handleChange}
                  value={values.address}
                  required={true}
                />
              </div>

              <div className="my-3">
                <label htmlFor="age" className="w-32">
                  <b>Edad del empleado </b>
                </label>
                <InputForm
                  name="age"
                  placeholder="Escribe la edad del "
                  onChange={handleChange}
                  value={values.age}
                  required={true}
                  maxLength={2}
                />
              </div>

              <div className="my-3">
                <label htmlFor="phone" className="w-32">
                  <b>Numero del empleado</b>
                </label>
                <InputForm
                  name="phone"
                  placeholder="Escribe el telefono del empleado"
                  onChange={handleChange}
                  value={values.phone}
                  required={true}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              {employee_id ? (
                <button
                  onClick={() =>
                    navigateTo(`/admin/restaurants/${restaurant_id}/employees`)
                  }
                  type="button"
                  className="border-2 dark:text-black bg-gray-100 hover-bg-gray-200 px-3 py-2 rounded"
                >
                  Cancelar
                </button>
              ) : null}
              <button
                disabled={isSubmitting}
                type="submit"
                className={`${"bg-teal-500 hover:bg-teal-600"} px-3 py-2 rounded text-white`}
              >
                {employee_id ? (
                  isSubmitting ? (
                    <p className="flex items-center">
                      <SpinerComponent
                        sizeSpiner="w-5 h-5"
                        colorSpiner="fill-teal-500"
                      />
                      Actualizando...
                    </p>
                  ) : (
                    "Actualizar"
                  )
                ) : isSubmitting ? (
                  <p className="flex items-center">
                    <SpinerComponent
                      sizeSpiner="w-5 h-5"
                      colorSpiner="fill-teal-500"
                    />
                    Creando...
                  </p>
                ) : (
                  "Crear Empleado"
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
      {/* Modal delete */}
      {employee_id ? (
        <div className="flex justify-center mt-5 mb-5">
          <WarningModal
            titleButtonModal="Eliminar Empleado"
            navigateToModal={`/admin/restaurants/${restaurant_id}/employees`}
            textHeaderComponent={
              <p className="py-3 pl-3 font-semibold">
                <span className="text-red-500">Eliminar/</span>{" "}
                {employee ? employee.user : null}
              </p>
            }
            textModalComponent={
              <div>
                <p className="mb-2">
                  Si eliminas al empleado{" "}
                  <span className="font-semibold">
                    {employee ? employee.user : null}
                  </span>
                  , se eliminará.
                </p>
                <p className="font-semibold">
                  Para continuar, escribe la contraseña de la cuenta.
                </p>
                <Formik
                  initialValues={{ password: "" }}
                  onSubmit={async (values) => {
                    handleVerifyPassword(values.password, employee.id);
                  }}
                >
                  {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        className="color-text p-4 w-full py-2 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-blue-800"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full mt-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 mr-2"
                      >
                        Eliminar
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            }
          />
        </div>
      ) : null}
    </div>
  );
}
