import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  createAdminUserRequest,
  getAllAdminUsersRequest,
  updateAdminUserRequest,
} from "../../services/user";
import Pagination from "../../components/tables/Pagination";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTable from "../../components/tables/BasicTable";
import Loader from "../../components/common/Loader";
import { useModal } from "../../hooks/useModal";

import { Column } from "../../components/tables/BasicTable";
import { User } from "../../types/Users";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Switch from "../../components/form/switch/Switch";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { EyeCloseIcon, EyeIcon, PlusIcon } from "../../icons";

const ITEMS_PER_PAGE = 20;

const columns: Column<User>[] = [
  { key: "username", label: "DNI" },
  { key: "fullname", label: "Nombre Completo" },
  {
    key: "status",
    label: "Estado",
    render: (value) =>
      value ? (
        <span className="text-green-500">Activo</span>
      ) : (
        <span className="text-red-500 font-extrabold">No activo</span>
      ),
  },
  {
    key: "signature",
    label: "Firma",
    render: (value) =>
      value && typeof value === "object" ? (
        <img
          src={value.secure_url}
          alt="Firma"
          className="w-16 h-16 object-cover dark:invert dark:brightness-0 dark:contrast-50"
        />
      ) : (
        <span className="text-gray-500">No disponible</span>
      ),
  },
];

export default function Users() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reports, setReports] = useState<User[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userFullname, setUserFullname] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const [userSignature, setUserSignature] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const renderActions = (user: User) => (
    <button
      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      onClick={() => handleEditUser(user)}
    >
      Editar
    </button>
  );

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const data = await getAllAdminUsersRequest(currentPage, ITEMS_PER_PAGE);
        setReports(data.users);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error al cargar los reportes.");
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/incoming-tests/${page}`);
  };

  const handleEditUser = async (user: User) => {
    setSelectedUser(user);
    setUserId(user._id);
    setUserUsername(user.username);
    setUserFullname(user.fullname);
    setUserStatus(user.status);
    if (user.signature?.secure_url) {
      try {
        const response = await fetch(user.signature.secure_url);
        const blob = await response.blob();
        const file = new File([blob], "signature.png", { type: blob.type });
        setUserSignature(file);
        setPreview(user.signature.secure_url);
      } catch (error) {
        console.error("Error al descargar la firma:", error);
        setUserSignature(null);
      }
    } else {
      setUserSignature(null);
    }
    openModal();
  };

  const handleAddUser = () => {
    resetModalFields();
    openModal();
  };

  const handleAddOrUpdateEvent = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("username", userUsername);
    formData.append("fullname", userFullname);
    if (userPassword.trim()) {
      formData.append("password", userPassword);
    }
    if (userSignature) {
      formData.append("image", userSignature);
    }
    formData.append("status", userStatus ? "true" : "false");

    try {
      if (selectedUser) {
        await updateAdminUserRequest(userId, formData);
      } else {
        await createAdminUserRequest(formData);
      }

      closeModal();
      resetModalFields();
    } catch (error) {
      console.error("Error al procesar el usuario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModalFields = () => {
    setUserUsername("");
    setUserFullname("");
    setUserPassword("");
    setUserStatus(false);
    setUserSignature(null);
    setPreview(null);
    setSelectedUser(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUserSignature(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) return <Loader />;

  return (
    <>
      <PageMeta
        title="Usuarios | Sovio Cusco - Admin Dashboard"
        description="Tablas de los moderadores de Sovio Cusco"
      />
      <PageBreadcrumb pageTitle="Usuarios" />
      <div className="space-y-6">
        <ComponentCard title={`Tabla ${currentPage}`}>
          <div className="flex justify-end mb-4">
            <Button
              size="sm"
              variant="primary"
              startIcon={<PlusIcon className="size-5" />}
              onClick={handleAddUser}
            >
              Registrar
            </Button>
          </div>
          {reports.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No se encontraron resultados.
            </p>
          ) : (
            <>
              <BasicTable
                data={reports}
                columns={columns}
                actions={renderActions}
                ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                currentPage={currentPage}
              />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </ComponentCard>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                {selectedUser ? "Editar Usuario" : "Agregar Usuario"}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Formulario para agregar o editar usuarios
              </p>
            </div>
            <div className="mt-8">
              <div>
                <Label htmlFor="username">Usuario</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Ingresa el nombre de usuario"
                  value={userUsername}
                  onChange={(e) => setUserUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fullname">Nombres</Label>
                <Input
                  type="text"
                  id="fullname"
                  placeholder="Ingresa el nombre completo"
                  value={userFullname}
                  onChange={(e) => setUserFullname(e.target.value)}
                />
              </div>
              <div>
                <Label>Contraseña</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresar contraseña"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label>Estado</Label>
                <Switch
                  label={userStatus ? "Activo" : "No activo"}
                  defaultChecked={userStatus}
                  onChange={(checked) => setUserStatus(checked)}
                />
              </div>
              <div>
                <Label>Firma</Label>
                <img
                  src={
                    preview ||
                    "https://img.icons8.com/material-outlined/54/image.png"
                  }
                  alt="Firma"
                  className="w-auto h-24 object-cover dark:invert dark:brightness-0 dark:contrast-50"
                />
                <FileInput
                  onChange={handleFileChange}
                  className="custom-class mt-4"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Close
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                type="button"
                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div role="status">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
                ) : selectedUser ? (
                  "Editar Usuario"
                ) : (
                  "Agregar Usuario"
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
