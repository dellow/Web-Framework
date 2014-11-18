<?php

/**
 *
 * A PHP mailer class for forms
 *
**/

// Prevent direct access to the file.
if(!empty($_SERVER['SCRIPT_FILENAME']) && 'mailer.php' === basename($_SERVER['SCRIPT_FILENAME']) && !isset($_REQUEST['ajaxrequest'])){
    die('Sorry. This page cannot be loaded directly.');
}

class mailer{

	public $response;

	/**
	 * __construct
	 * Class constructor.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $type - String. Either 'mail', 'login', 'account', 'register'. Default: 'mail'.
	 * @param $field_id - String. The array the mailer should expect. Default 'fields'.
	 * @param $args - Array. Options like domain, site title and headers.
	**/
	public function __construct($type = 'mail', $field_id = 'fields', $args = array()){
        // Response array
        $this->response = array();
        // Form ID
        $this->id = $field_id;
        // Action the form
        $this->{$type}($args);
	}

	/**
	 * process_fields
	 * Validates and sanitizes post data and puts into an array.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	**/
	public function process_fields(){
		// Success var
		$success = true;
		// Functions
		function safe_key($value){
			return str_replace('-', '_', $value);
		}
		function check_email($value){
			return (filter_var($value, FILTER_VALIDATE_EMAIL)) ? $value : false;
		}
		function check_url($value){
			return (filter_var($value, FILTER_VALIDATE_URL)) ? $value : false;
		}
		function check_password($value){
			return (preg_match('/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/', $value)) ? $value : false;
		}
		function check_array($value){
			if(is_array($value)){
				// Check for a dummy value and unset
				if(isset($value['dummy'])){unset($value['dummy']);}
				// Check existence
				if(!empty($value)){
					return true;
				}
			}
			return false;
		}
		function check_existence($value){
			return (!empty($value)) ? strip_tags($value) : false;
		}
		// Cycle through fields
		foreach($_REQUEST[$this->id] as $key=>$value){
			$valid = true;
			if(isset($_REQUEST['validationfilter'][$key])){
				$include = true;
				// Check method
				switch($_REQUEST['validationfilter'][$key]){
					case 'existence':
						$valid = check_existence($value);
					break;
					case 'email':
						$valid = check_email($value);
					break;
					case 'url':
						$valid = check_url($value);
					break;
					case 'password':
						$valid = check_password($value);
					break;
					case 'array':
						$valid = check_array($value);
					break;
				}
			}
			// Field is valid
			if($valid){
				// If this needs to be included in the field_array
				if($include){
					$fields[safe_key($key)] = $value;
				}
			}
			// Field is not valid
			elseif(!empty($_REQUEST['validationmessage'][$key])){
				$success = false;
				$this->response[$this->id]['error'][$key]['msg'] = $_REQUEST['validationmessage'][$key];
				if(is_array($value)){
					$this->response[$this->id]['error'][$key]['field'] = $this->id . '[' . $key . '][]';
				}
				else{
					$this->response[$this->id]['error'][$key]['field'] = $this->id . '[' . $key . ']';
				}
			}
		}

		$this->ajax_response();
		return ($success) ? $fields : false;
	}

	/**
	 * mail
	 * Method for dealing with mail forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $args - Array. Settings.
	**/
	public function mail($args){
		// Check form is posted.
		if(!isset($_REQUEST[$this->id])){ return; }

		/**
		 * get_domain
		 * Parses a URL for the domain
		 *
		 * @since 1.0.0
		 * @version 1.0.0
		 * @uses
		**/
		function get_domain($URL){
	        $pieces = parse_url($URL);
	        $domain = isset($pieces['host']) ? $pieces['host'] : null;
	        if(preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)){
	            return $regs['domain'];
	        }

	        return false;
		}

		/**
		 * get_mail_headers
		 * Get email headers.
		 *
		 * @since 1.0.0
		 * @version 1.0.0
		**/
		function get_mail_headers($args){
			$headers  = 'MIME-Version: 1.0' . "\n";
			$headers .= 'Content-type: text/html; charset=UTF-8' . "\n";
			$headers .= 'From: ' . $args['title'] . ' <noreply@' . get_domain($args['domain']) . '>' . "\n";
			$headers .= (!empty($args['reply-to'])) ? 'Reply-To: ' . $args['reply-to'][0] . ' <' . $args['reply-to'][1] . '>' . "\n" : null;
			// Reply to
			if(!empty($args['reply_to'])){
				$string = '';
				foreach($args['reply_to'] as $reply_to){
					$string .= $reply_to[0] . ' <' . $reply_to[1] . '>';
					if(each($args['reply_to'])) $string .= ', ';
				}
				$headers .= (!empty($args['reply_to'])) ? 'Reply-To: ' . $string . "\n" : null;
			}
			// CC
			if(!empty($args['cc'])){
				$string = '';
				foreach($args['cc'] as $cc){
					$string .= $cc[0] . ' <' . $cc[1] . '>';
					if(each($args['cc'])) $string .= ', ';
				}
				$headers .= (!empty($args['cc'])) ? 'Cc: ' . $string . "\n" : null;
			}
			// BCC
			if(!empty($args['bcc'])){
				$string = '';
				foreach($args['bcc'] as $bcc){
					$string .= $bcc[0] . ' <' . $bcc[1] . '>';
					if(each($args['bcc'])) $string .= ', ';
				}
				$headers .= (!empty($args['bcc'])) ? 'Bcc: ' . $string . "\n" : null;
			}

			return $headers;
		}

		// Fields
		$fields = $this->process_fields();
		// If fields is valid
		if($fields){
			// Recipient
			$recipient            = $args['recipient'];
			// Subject
			$subject              = $args['subject'];
			// Headers
			$headers              = get_mail_headers($args);
			// Add date and time to array
			$fields['date_sent']  = date('d/m/Y | H:i:s');
			// Add IP address to array
			$fields['ip_address'] = $_SERVER['REMOTE_ADDR'];
			// Remove Form ID
			unset($fields['form_ID']);
			// Message
			$message   = '
				<html>
				<head>
				    <style type="text/css">
				    .ReadMsgBod     {width: 100%;}
				    .ExternalClass  {width: 100%;}
				    body            {font-family: Arial; font-size: 12px; line-height: 16px; -webkit-text-size-adjust: none; margin: 0; padding: 0;}
				    img             {display: block;}
				    table           {border-collapse: collapse;}
				    td              {padding: 5px;}
				    </style>
				</head>
				<body>
	    			<table width="600" border="0" align="center" cellpadding="0" cellspacing="0">';
			    		$i = 0;
				    	foreach($fields as $k=>$v){
							$array = @unserialize($v);
							if($array === false && $v !== 'b:0;'){
							}
							else{
								$v_array = unserialize($v);
								$v = implode('<br>', $v_array);
							}

							$bgcolor = ($i % 2 == 0) ? '#FFFFFF' : '#F2EFEF';

				    		$message .= '
				    		<tr height="25" style="background: ' . $bgcolor . '">
					    		<td valign="top" style="padding: 3px;"><strong>' . ucwords(str_replace(array('_', '-'), ' ', $k)) . ':</strong></td>
					    		<td width="5"></td>
					    		<td valign="top" style="padding: 3px;">' . $v . '</td>
				    		</tr>';

				    		$i++;
				    	}
	    	$message .= '
				    </table>
				</body>
			</html>';

			// Send the email
			if(@mail($recipient, $subject, $message, $headers)){
				$this->response['form']['success']['all']['msg'] = 'Mail sent';
			}
			else {
				$this->response['form']['error']['all']['msg'] = 'Mail sending failed';
			}

			$this->ajax_response();
		}
	}

	/**
	 * login
	 * Method for dealing with login forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $args - Array. Settings.
	**/
	public function login($args){
	}

	/**
	 * account
	 * Method for dealing with account forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $args - Array. Settings.
	**/
	public function account($args){
	}

	/**
	 * register
	 * Method for dealing with register forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $args - Array. Settings.
	**/
	public function register($args){
	}

	/**
	 * ajax_response
	 * Return a response for Ajax.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	**/
	public function ajax_response(){
		// If we have a response return it for Ajax
		if(!empty($this->response) && isset($_REQUEST['ajaxrequest'])){
		    echo json_encode($this->response);
		    exit;
		}
	}

	/**
	 * response
	 * Called from the template to output the response messages.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	**/
	public function response(){
		if($this->response){
			foreach($this->response as $response){
				foreach($response as $k=>$v) : ?>
					<ul class="alert box <?php echo $k; ?>">
						<?php foreach($v as $error) : ?>
							<li><?php echo $error['msg']; ?></li>
						<?php endforeach; ?>
					</ul>
				<?php endforeach;
			}
		}
	}
}

?>