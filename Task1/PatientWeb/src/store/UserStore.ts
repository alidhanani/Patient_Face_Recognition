import create from 'zustand';

const useUserStore = create((set) => ({
  dataList: [],
  patientInfo: {  // Corrected the key here
    username: '',
    email: '',
    uid: '',
  },
  patientVideoPath: {

  },
  imageAnalysis: [],
  setDataList: (newDataList: any) => set({ dataList: newDataList }),
  setPatientInfo: (patientInfo: any) => set({ patientInfo: patientInfo }),
  setpatientVideoPath: (patientVideo: any) => set({patientVideoPath: patientVideo}),
  setImageAnalysis: (imageAnalysis: any) => set({imageAnalysis: imageAnalysis})
}));

export default useUserStore;
