import CloseIcon from "@mui/icons-material/Close";

export const Modal = ({ title, children, setModal, position = '' , hasX }) => {
  return (
    <div
      id="modal"
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center z-[999]`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-end p-3">
          {hasX && (
            <div className="rounded-lg" onClick={() => setModal(false)}>
            <CloseIcon />
          </div>
          )}
        </div>
        <div className="pl-6 pr-6 pb-6">{children}</div>
      </div>
    </div>
  );
};
