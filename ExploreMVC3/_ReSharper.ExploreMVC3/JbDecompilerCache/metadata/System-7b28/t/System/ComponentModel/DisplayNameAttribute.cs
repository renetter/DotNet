// Type: System.ComponentModel.DisplayNameAttribute
// Assembly: System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089
// Assembly location: C:\Windows\Microsoft.NET\Framework\v4.0.30319\System.dll

using System;
using System.Runtime;

namespace System.ComponentModel
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Event | AttributeTargets.Method | AttributeTargets.Property)]
    public class DisplayNameAttribute : Attribute
    {
        public static readonly DisplayNameAttribute Default;
        public DisplayNameAttribute();

        [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        public DisplayNameAttribute(string displayName);

        public virtual string DisplayName { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        get; }

        protected string DisplayNameValue { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        get; [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        set; }

        public override bool Equals(object obj);
        public override int GetHashCode();
        public override bool IsDefaultAttribute();
    }
}
