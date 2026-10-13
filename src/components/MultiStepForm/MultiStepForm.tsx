"use client";

import { useState } from "react";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ParentForm from "./components/ParentForm";
import ProgressBar from "./components/ProgressBar";
import useMultiStepForm from "./useMultiStepForm";
import AddressForm from "./components/AddressForm";
import ChildForm from "./components/ChildForm";
import CareForm from "./components/CareForm";
import { useTranslation } from "@/i18n/LanguageProvider";
import ReviewData from "./components/ReviewData";
import MiscForm from "./components/MiscForm";
import emailjs from "@emailjs/browser";
import Typography from "../Typography/Typography";
import styles from "./MultiStepForm.module.scss";

const INITIAL_DATA: MultiStepFormData = {
  parentData: { firstName: "", lastName: "", email: "", phone: "" },
  childData: {
    firstName: "",
    lastName: "",
    birthday: "",
  },
  careData: {
    startDate: "",
    endDate: "",
  },
  addressData: {
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
  },
  miscData: {
    message: "",
    referral: "",
  },
};

export default function MultiStepForm({
  submitLabel,
  successMessage,
}: {
  submitLabel?: string;
  successMessage?: string;
}) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  function updateFields<K extends MSFDataIndex>(
    fields: Pick<MultiStepFormData, K>,
  ): void {
    setFormData({ ...formData, ...fields });
  }

  const STEPS = [
    <ParentForm
      key="parent"
      {...formData.parentData}
      updateFields={updateFields<"parentData">}
    />,
    <ChildForm
      key="child"
      {...formData.childData}
      updateFields={updateFields}
    />,
    <CareForm key="care" {...formData.careData} updateFields={updateFields} />,
    <AddressForm
      key="address"
      {...formData.addressData}
      updateFields={updateFields}
    />,
    <MiscForm key="misc" {...formData.miscData} updateFields={updateFields} />,
    <ReviewData key="review" {...formData} onEdit={(index) => goTo(index)} />,
  ];

  /**
     * LEARNING:
     * No. ReviewData doesn’t need context; pass it a wrapper callback:

    The wrapper is created while STEPS is being built, but it doesn’t read goTo until ReviewData calls it. By then, the hook has returned and goTo is initialized. With onEdit={goTo}, JavaScript tries to read goTo immediately, before the hook call below STEPS.
    Your current hook returns goTo and derives the displayed step from the index, so this wrapper is the smallest fix. A larger alternative would be to redesign the hook to take a step count, call it first, and build STEPS afterward, but that isn’t necessary here.
    */
  function formatGermanDate(value: string): string {
    if (!value) return "";

    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year}`;
  }

  function handleSubmit() {
    const emailData = {
      ...formData,
      childData: {
        ...formData.childData,
        birthday: formatGermanDate(formData.childData.birthday),
      },
      careData: {
        ...formData.careData,
        startDate: formatGermanDate(formData.careData.startDate),
        endDate: formatGermanDate(formData.careData.endDate),
      },
    };

    emailjs
      .send(
        "service_lisecdf",
        "template_upr3gqo",
        emailData,
        "6ejAO_oWgLdchGR_-",
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    setFormData(INITIAL_DATA);
    setSuccess(true);
  }

  const { step, stepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepForm(STEPS, handleSubmit);

  if (!success)
    return (
      <div className={styles.wizard}>
        <ProgressBar
          currentStep={stepIndex}
          steps={[
            t("contact.parentData.title"),
            t("contact.childData.title"),
            t("contact.careData.title"),
            t("contact.addressData.title"),
            t("contact.miscData.title"),
            submitLabel || t("contact.submitBtn"),
          ]}
        />
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
        >
          <div className={styles.stepContent}>{step}</div>
          <div className={styles.actions}>
            {/* LEARNING: buttons inside forms a by default of type submit. This caused the back function to execute but by overwritten by the automatic refresh of the form */}
            <ButtonPrimary
              variant="button"
              type="button"
              disabled={isFirstStep}
              onClick={back}
            >
              {t("contact.backBtn")}
            </ButtonPrimary>
            <ButtonPrimary variant="button" type="submit">
              {isLastStep
                ? submitLabel || t("contact.submitBtn")
                : t("contact.nextBtn")}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    );
  else
    return (
      <div className={styles.success}>
        <div>
          <Typography type="h1">{t("contact.success.title")}</Typography>
          <Typography type="body-semibold">
            {successMessage || t("contact.success.subtitle")}
          </Typography>
        </div>
        <ButtonPrimary
          variant="button"
          onClick={() => {
            goTo(0);
            setSuccess(false);
          }}
        >
          {t("contact.reset")}
        </ButtonPrimary>
      </div>
    );
}
