import CloseIcon from "@mui/icons-material/Close";

export const Modal = ({ title, children, setModal, position = '' , hasX }) => {
  return (
    <div
      id="modal"
      className={`fixed inset-0 ${position}  bg-gray-800 bg-opacity-50 flex items-start justify-center z-[999]`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-end">
          {hasX && (
            <div className="rounded-lg" onClick={() => setModal(false)}>
            <CloseIcon />
          </div>
          )}
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};
