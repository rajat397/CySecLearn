/* eslint-disable */
import React, { useState } from "react";
// import FileBase from 'react-file-base64';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { api } from "../api";

export default function CreateProfile() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: cookies.UserId,
    full_name: "",
    professional_title: "",
    years_exp: "",
    github_username: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    show_email: false,
    gender_identity: "man",
    url: "",
    about: "",
    ieee_id: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    const newOb = {
      username: formData.username,
      name: formData.full_name,
      dob_day: formData.dob_day,
      dob_month: formData.dob_month,
      dob_year: formData.dob_year,
      gender: formData.gender_identity,
      img_url: formData.url,
      about: formData.about,
      professional_title: formData.professional_title,
      years_of_experience: formData.years_exp,
      show_email: formData.show_email,
      github_username: formData.github_username,
      show_gender: formData.show_gender,
      ieee_id: formData.ieee_id,
    };
    const params = {
      username: cookies["UserId"],
      token: cookies["AuthToken"],
    };
    try {
      setLoading(true);
      const res = await api.updateUser(newOb, params);
      // console.log('here');
      // console.log(res)
      setLoading(false);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.log(e.response.message);
    }
  };
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Oval color="#0287BF" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="onboarding bg-[#E1E9F4] bg-opacity-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0287BF] text-center pt-8 pb-5">
        Create Profile
      </h2>

      <form
        className="justify-center w-[50%] ml-[25%] md:w-[36%] md:ml-[32%]"
        onSubmit={handleSubmit}
      >
        <section className="flex flex-col">
          <label htmlFor="full_name" className="mt-2.5 text-start">
            Full Name
          </label>
          <input
            className="p-2 md:p-3 w-[100%] border-[#2f2e41] border-2 rounded-lg mt-2.5 mb-2.5 text-base"
            id="full_name"
            type="text"
            name="full_name"
            placeholder="Full Name"
            required={true}
            value={formData.full_name}
            onChange={handleChange}
          />

          <label htmlFor="professional_title" className="mt-2.5 text-start">
            Professional Title
          </label>
          <input
            className="p-2 md:p-3 mt-2.5 w-[100%] mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="professional_title"
            type="text"
            name="professional_title"
            placeholder="Professional Title"
            required={true}
            value={formData.professional_title}
            onChange={handleChange}
          />

          <label htmlFor="years_exp" className="mt-2.5 text-start">
            Years of Experience
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="years_exp"
            type="number"
            name="years_exp"
            placeholder="Years of Experience"
            required={true}
            value={formData.years_exp}
            onChange={handleChange}
          />

          <label htmlFor="github_username" className="mt-2.5 text-start">
            Github Username
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="github_username"
            type="text"
            name="github_username"
            placeholder="Github Username"
            value={formData.github_username}
            onChange={handleChange}
          />

        <label htmlFor="github_username" className="mt-2.5 text-start">
            IEEE Username
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="github_username"
            type="text"
            name="ieee_id"
            placeholder="IEEE Username"
            value={formData.ieee_id}
            onChange={handleChange}
          />

          <label className="mt-2.5 text-start">Birthday</label>
          <div className="multiple-input-container flex flex-row">
            <input
              className="w-[30%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
              id="dob_day"
              type="number"
              name="dob_day"
              placeholder="DD"
              required={true}
              value={formData.dob_day}
              onChange={handleChange}
            />

            <input
              className="w-[30%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
              id="dob_month"
              type="number"
              name="dob_month"
              placeholder="MM"
              required={true}
              value={formData.dob_month}
              onChange={handleChange}
            />

            <input
              className="w-[40%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
              id="dob_year"
              type="number"
              name="dob_year"
              placeholder="YYYY"
              required={true}
              value={formData.dob_year}
              onChange={handleChange}
            />
          </div>

          <label className="mt-2.5 text-start">Gender</label>
          <div className="multiple-input-container flex flex-row">
            <input
              className="hidden p-2 md:p-3 mt-2.5 mb-2.5 mr-2 text-base border-[#2f2e41] border-2 rounded-lg"
              id="man-gender-identity"
              type="radio"
              name="gender_identity"
              value="man"
              onChange={handleChange}
              checked={formData.gender_identity === "man"}
            />
            <label
              htmlFor="man-gender-identity"
              className="mt-2.5 mb-2.5 p-2.5 border-gray-400 border-2 rounded-lg mr-2.5 transition-all duration-300 cursor-pointer"
            >
              Man
            </label>
            <input
              className="hidden p-2 md:p-3 mt-2.5 mb-2.5 mr-2 text-base border-[#2f2e41] border-2 rounded-lg"
              id="woman-gender-identity"
              type="radio"
              name="gender_identity"
              value="woman"
              onChange={handleChange}
              checked={formData.gender_identity === "woman"}
            />
            <label
              htmlFor="woman-gender-identity"
              className="mt-2.5 mb-2.5 p-2.5 border-gray-400 border-2 rounded-lg mr-2.5 transition-all duration-300 cursor-pointer"
            >
              Woman
            </label>
            <input
              className="hidden p-2 md:p-3 mt-2.5 mb-2.5 mr-2 text-base border-[#2f2e41] border-2 rounded-lg"
              id="more-gender-identity"
              type="radio"
              name="gender_identity"
              value="other"
              onChange={handleChange}
              checked={formData.gender_identity === "other"}
            />
            <label
              htmlFor="more-gender-identity"
              className="mt-2.5 mb-2.5 p-2.5 border-gray-400 border-2 rounded-lg mr-2.5 transition-all duration-300 cursor-pointer"
            >
              Other
            </label>
          </div>

          <label htmlFor="show-gender" className="mt-7 text-start check-cont">
            Show Gender on my Profile
            <input
              className=""
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="show-email" className="mt-5 text-start check-cont">
            Show Email on my Profile
            <input
              className=""
              id="show-email"
              type="checkbox"
              name="show_email"
              onChange={handleChange}
              checked={formData.show_email}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="about" className="mt-2.5 text-start">
            About me
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="about"
            type="text"
            name="about"
            required={true}
            placeholder="I like long walks..."
            value={formData.about}
            onChange={handleChange}
            maxLength={500}
          />

          <label htmlFor="url" className=" mt-4 mb-2.5 text-start">
            Profile Photo
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="url"
            type="text"
            name="url"
            placeholder="image url"
            value={formData.url}
            onChange={handleChange}
          />
          <div className="photo-container w-[100%] mt-2.5 mb-2.5">
            {formData.url && (
              <img src={formData.url} alt="profile pic preview" />
            )}
          </div>
        </section>

        <button className="text-white bg-[#0287BF] px-4 py-2 md:px-6 md:py-3 m-2 rounded-full font-semibold w-fit text-lg md:text-xl cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}
