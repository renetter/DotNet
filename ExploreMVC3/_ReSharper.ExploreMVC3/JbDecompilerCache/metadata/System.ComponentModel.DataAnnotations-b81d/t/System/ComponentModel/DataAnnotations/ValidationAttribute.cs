// Type: System.ComponentModel.DataAnnotations.ValidationAttribute
// Assembly: System.ComponentModel.DataAnnotations, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
// Assembly location: C:\Windows\Microsoft.NET\Framework\v4.0.30319\System.ComponentModel.DataAnnotations.dll

using System;
using System.Runtime;

namespace System.ComponentModel.DataAnnotations
{
    public abstract class ValidationAttribute : Attribute
    {
        protected ValidationAttribute();
        protected ValidationAttribute(string errorMessage);
        protected ValidationAttribute(Func<string> errorMessageAccessor);
        protected string ErrorMessageString { get; }

        public string ErrorMessage { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        get; set; }

        public string ErrorMessageResourceName { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        get; set; }

        public Type ErrorMessageResourceType { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        get; set; }

        public virtual string FormatErrorMessage(string name);
        public virtual bool IsValid(object value);
        protected virtual ValidationResult IsValid(object value, ValidationContext validationContext);
        public ValidationResult GetValidationResult(object value, ValidationContext validationContext);
        public void Validate(object value, string name);
        public void Validate(object value, ValidationContext validationContext);
    }
}
