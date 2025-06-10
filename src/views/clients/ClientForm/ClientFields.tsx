import AdaptableCard from '@/components/shared/AdaptableCard'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Select } from '@/components/ui'
import type { Guarantee } from '@/@types/clients'
import { useEffect, useState } from 'react'
import { apiGetAllServices } from '@/services/ClientsService'
import { useAppDispatch } from '@/store'

type FormFieldsName = {
    fullName: string
    email: string
    phone: string
    clientType: string
    carModel: string
    carColor: string
    service: string
    guarantee: Guarantee
}

type ClientFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: FormFieldsName
}

const ClientFields = (props: ClientFieldsProps) => {
    const [services, setServices] = useState<
        { label: string; value: string }[]
    >([])
    const [loadingServices, setLoadingServices] = useState<boolean>(false)

    const clientTypes = [
        { label: 'فردي', value: 'individual' },
        { label: 'شركة', value: 'company' },
    ]

    const getServices = async () => {
        setLoadingServices(true)
        try {
            const res = await apiGetAllServices()
            const allServices = res.data.data.map((service: any) => ({
                label: service.name,
                value: service.name,
            }))
            setServices(allServices)
        } catch (error) {
            setServices([]) // empty on error
        }
        setLoadingServices(false)
    }

    useEffect(() => {
        getServices()
    }, [])

    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>معلومات العميل</h5>
            <p className="mb-6">قسم لإعداد معلومات العميل الأساسية</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem
                    label="الاسم كامل"
                    invalid={!!errors.fullName && !!touched.fullName}
                    errorMessage={errors.fullName}
                >
                    <Field
                        name="fullName"
                        size="sm"
                        autoComplete="off"
                        type="text"
                        placeholder="الاسم الكامل"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="البريد الإلكتروني"
                    invalid={!!errors.email && !!touched.email}
                    errorMessage={errors.email}
                >
                    <Field
                        name="email"
                        size="sm"
                        type="email"
                        placeholder="البريد الإلكتروني"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="رقم الهاتف"
                    invalid={!!errors.phone && !!touched.phone}
                    errorMessage={errors.phone}
                >
                    <Field
                        name="phone"
                        type="text"
                        size="sm"
                        placeholder="رقم الهاتف"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="نوع العميل"
                    invalid={!!errors.clientType && !!touched.clientType}
                    errorMessage={errors.clientType}
                >
                    <Field name="clientType">
                        {({ field, form }: FieldProps) => (
                            <Select
                                field={field}
                                size="sm"
                                form={form}
                                options={clientTypes}
                                value={clientTypes.find(
                                    (option) =>
                                        option.value === values.clientType
                                )}
                                onChange={(option) => {
                                    form.setFieldValue(
                                        field.name,
                                        option?.value
                                    )
                                }}
                                placeholder="نوع العميل"
                            />
                        )}
                    </Field>
                </FormItem>

                <FormItem
                    label="موديل السيارة"
                    invalid={!!errors.carModel && !!touched.carModel}
                    errorMessage={errors.carModel}
                >
                    <Field
                        name="carModel"
                        type="text"
                        size="sm"
                        placeholder="موديل السيارة"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="لون السيارة"
                    invalid={!!errors.carColor && !!touched.carColor}
                    errorMessage={errors.carColor}
                >
                    <Field
                        name="carColor"
                        type="text"
                        size="sm"
                        placeholder="لون السيارة"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="الخدمة"
                    invalid={!!errors.service && !!touched.service}
                    errorMessage={errors.service}
                >
                    <Field name="service">
                        {({ field, form }: FieldProps) => (
                            <Select
                                field={field}
                                form={form}
                                options={
                                    loadingServices
                                        ? [
                                              {
                                                  label: 'جاري التحميل...',
                                                  value: '',
                                              },
                                          ]
                                        : services.length > 0
                                        ? services
                                        : [
                                              {
                                                  label: 'لا توجد خدمات متاحة',
                                                  value: '',
                                              },
                                          ]
                                }
                                value={services.filter(
                                    (service) =>
                                        service.value === values.service
                                )}
                                onChange={(option) => {
                                    form.setFieldValue(
                                        field.name,
                                        option?.value
                                    )
                                }}
                            />
                        )}
                    </Field>
                </FormItem>

                {/* <FormItem
                    label="المنتجات"
                    invalid={
                        !!errors.guarantee?.products &&
                        !!touched.guarantee?.products
                    }
                    errorMessage={errors.guarantee?.products as string}
                >
                    <Field name="guarantee.products">
                        {({ field, form }: FieldProps) => (
                            <Select
                                isMulti
                                size="sm"
                                placeholder="اختر المنتجات"
                                options={[
                                    {
                                        label: 'Thermal Coating',
                                        value: 'Thermal Coating',
                                    },
                                    {
                                        label: 'Ceramic Layer',
                                        value: 'Ceramic Layer',
                                    },
                                    {
                                        label: 'Nano Protection',
                                        value: 'Nano Protection',
                                    },
                                ]}
                                value={
                                    field.value
                                        ? field.value.map((val: string) => ({
                                              label: val,
                                              value: val,
                                          }))
                                        : []
                                }
                                onChange={(selectedOptions) =>
                                    form.setFieldValue(
                                        field.name,
                                        selectedOptions.map(
                                            (option: any) => option.value
                                        )
                                    )
                                }
                            />
                        )}
                    </Field>
                </FormItem> */}
            </div>

            <h5 className="mt-8">معلومات الضمان</h5>
            <p className="mb-6">قسم لإعداد معلومات الضمان</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem
                    label="نوع الضمان"
                    invalid={
                        !!errors.guarantee?.typeGuarantee &&
                        !!touched.guarantee?.typeGuarantee
                    }
                    errorMessage={errors.guarantee?.typeGuarantee}
                >
                    <Field
                        name="guarantee.typeGuarantee"
                        type="text"
                        size="sm"
                        placeholder="نوع الضمان"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="تاريخ البدء"
                    invalid={
                        !!errors.guarantee?.startDate &&
                        !!touched.guarantee?.startDate
                    }
                    errorMessage={errors.guarantee?.startDate}
                >
                    <Field
                        name="guarantee.startDate"
                        type="date"
                        size="sm"
                        component={Input}
                        placeholder="تاريخ البدء"
                    />
                </FormItem>

                <FormItem
                    label="تاريخ الانتهاء"
                    invalid={
                        !!errors.guarantee?.endDate &&
                        !!touched.guarantee?.endDate
                    }
                    errorMessage={errors.guarantee?.endDate}
                >
                    <Field
                        name="guarantee.endDate"
                        size="sm"
                        type="date"
                        component={Input}
                        placeholder="تاريخ الانتهاء"
                    />
                </FormItem>

                <FormItem
                    label="الشروط"
                    invalid={
                        !!errors.guarantee?.terms && !!touched.guarantee?.terms
                    }
                    errorMessage={errors.guarantee?.terms}
                >
                    <Field
                        name="guarantee.terms"
                        type="text"
                        size="sm"
                        placeholder="شروط الضمان"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="المكونات المشمولة"
                    invalid={
                        !!errors.guarantee?.coveredComponents &&
                        !!touched.guarantee?.coveredComponents
                    }
                    errorMessage={errors.guarantee?.coveredComponents as string}
                >
                    <Field name="guarantee.coveredComponents">
                        {({ field, form }: FieldProps) => (
                            <Select
                                isMulti
                                size="sm"
                                placeholder="اختر المكونات المشمولة"
                                options={[
                                    {
                                        label: 'Windshield',
                                        value: 'Windshield',
                                    },
                                    {
                                        label: 'Side Windows',
                                        value: 'Side Windows',
                                    },
                                    {
                                        label: 'Rear Window',
                                        value: 'Rear Window',
                                    },
                                ]}
                                value={
                                    field.value
                                        ? field.value.map((val: string) => ({
                                              label: val,
                                              value: val,
                                          }))
                                        : []
                                }
                                onChange={(selectedOptions) =>
                                    form.setFieldValue(
                                        field.name,
                                        selectedOptions.map(
                                            (option: any) => option.value
                                        )
                                    )
                                }
                            />
                        )}
                    </Field>
                </FormItem>
            </div>
        </AdaptableCard>
    )
}

export default ClientFields
