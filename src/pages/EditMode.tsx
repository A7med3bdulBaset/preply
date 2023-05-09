import React, { useState } from "react";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Teacher from "../components/Teacher";
import useLocalStorage from "../hooks/useLocalStorage";
import { OrderMethodType, QueriesProps, TeacherType } from "../Types";

type Props = {
	teachersLength: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	loading: boolean;
	teachers: { data: TeacherType; doc_id: string }[];
	setError: React.Dispatch<React.SetStateAction<string>>;
	setQueries: React.Dispatch<React.SetStateAction<QueriesProps>>;
	queriesCode: string;
	setQueriesCode: React.Dispatch<React.SetStateAction<string>>;
	orderMethod: OrderMethodType;
	setOrderMethod: React.Dispatch<React.SetStateAction<OrderMethodType>>;
	dataFromFireStore: { data: TeacherType; doc_id: string }[];
	queries: QueriesProps;
	getData: () => void;
};

function EditMode({
	teachersLength,
	currentPage,
	setCurrentPage,
	teachers,
	setError,
	loading,
	setQueries,
	queriesCode,
	setQueriesCode,
	orderMethod,
	setOrderMethod,
	dataFromFireStore,
	queries,
	getData,
}: Props) {
	const [storage, setStorage] = useLocalStorage<{ isEditMode: boolean }>(
		"editMode",
		{ isEditMode: false }
	);
	const [editMode, setEditMode] = useState(storage.isEditMode);

	React.useEffect(() => {
		setStorage({ isEditMode: editMode });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editMode])

	return (
		<>
			<Filters
				setQueries={setQueries}
				setQueriesCode={setQueriesCode}
				setOrderMethod={setOrderMethod}
				queries={queries}
				orderMethod={orderMethod}
				getData={getData}
			/>

			<Header
				teachersLength={teachersLength}
				editMode={editMode}
				setEditMode={setEditMode}
				queryText={queriesCode}
				isQueryCode={true}
			/>

			<div className="teachers-list">
				{loading && (
					<p
						style={{
							color: "#2f2201",
							backgroundColor: "#f9d8862d",
							padding: 16,
							marginBlock: 16,
							borderRadius: 10,
							border: "1px dashed #2f2201",
						}}
					>
						Loading...
					</p>
				)}

				{!teachers.length && !loading && (
					<p
						style={{
							color: "#2f2201",
							backgroundColor: "#f9d8862d",
							padding: 16,
							marginBlock: 16,
							borderRadius: 10,
							border: "1px dashed #2f2201",
						}}
					>
						No teachers found. Try to select some filters.
					</p>
				)}
				{teachers &&
					teachers.map((teacher) => (
						<Teacher
							teacherData={teacher.data}
							key={teacher.data.tutor_id}
							editMode={editMode}
							setError={setError}
							doc_id={teacher.doc_id}
						/>
					))}
			</div>

			<Footer
				teachersLength={teachersLength}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}

export default EditMode;
